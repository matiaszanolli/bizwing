// Executive management subsystem

import { BaseManager } from './BaseManager';
import { Executive, ExecutiveAction, ExecutiveActionType, ExecutiveActionResult } from '../../models/types';
import { generateId, formatMoney } from '../../utils/helpers';
import {
    EXECUTIVE_ACTION_COSTS,
    calculateActionSuccessRate,
    EXECUTIVE_XP_GAIN,
    EXECUTIVE_LEVEL_UP_XP,
    MORALE_CHANGES
} from '../../data/executives';

export class ExecutiveManager extends BaseManager {
    /**
     * Hire a new executive
     */
    hireExecutive(executive: Executive): { success: boolean; error?: string } {
        // Check if can afford first quarter salary
        if (!this.state.canAfford(executive.salary)) {
            return { success: false, error: 'Insufficient funds to hire executive!' };
        }

        // Check if already have max executives (4 max, one per role)
        if (this.state.executives.length >= 4) {
            return { success: false, error: 'Maximum 4 executives allowed!' };
        }

        // Check if already have an executive with this role
        const existingRole = this.state.executives.find(e => e.role === executive.role);
        if (existingRole) {
            return { success: false, error: `Already have a ${executive.role} executive!` };
        }

        // Add executive to roster
        this.state.executives.push({ ...executive });
        this.state.addNews(`Hired ${executive.name} as ${executive.level} ${executive.role} executive ($${formatMoney(executive.salary)}/quarter)`);

        return { success: true };
    }

    /**
     * Fire an executive
     */
    fireExecutive(executiveId: number): { success: boolean; error?: string } {
        const executive = this.state.executives.find(e => e.id === executiveId);

        if (!executive) {
            return { success: false, error: 'Executive not found!' };
        }

        // Cancel any active action
        if (executive.current_action) {
            this.state.executiveActions = this.state.executiveActions.filter(
                a => a.id !== executive.current_action!.id
            );
        }

        // Remove executive
        this.state.executives = this.state.executives.filter(e => e.id !== executiveId);

        // Morale hit for remaining executives
        this.state.executives.forEach(e => {
            e.morale = Math.max(0, e.morale - 5);
        });

        this.state.addNews(`Fired ${executive.name} (${executive.role})`);

        return { success: true };
    }

    /**
     * Assign an executive to perform an action
     */
    assignExecutiveAction(
        executiveId: number,
        actionType: ExecutiveActionType,
        target?: string,
        parameters?: Record<string, any>
    ): { success: boolean; error?: string } {
        const executive = this.state.executives.find(e => e.id === executiveId);

        if (!executive) {
            return { success: false, error: 'Executive not found!' };
        }

        if (executive.current_action) {
            return { success: false, error: 'Executive is already assigned to an action!' };
        }

        // Get action details
        const actionDetails = EXECUTIVE_ACTION_COSTS[actionType];

        if (!actionDetails) {
            return { success: false, error: 'Invalid action type!' };
        }

        // Check if can afford action
        if (!this.state.canAfford(actionDetails.cost)) {
            return { success: false, error: `Insufficient funds! Action costs $${formatMoney(actionDetails.cost)}` };
        }

        // Deduct cost
        this.state.cash -= actionDetails.cost;

        // Create action
        const action: ExecutiveAction = {
            id: `action_${generateId()}`,
            executive_id: executiveId,
            action_type: actionType,
            quarters_remaining: actionDetails.duration,
            target,
            parameters
        };

        // Assign action
        executive.current_action = action;
        this.state.executiveActions.push(action);

        this.state.addNews(`${executive.name} assigned to ${actionType.replace(/_/g, ' ').toLowerCase()} ($${formatMoney(actionDetails.cost)})`);

        return { success: true };
    }

    /**
     * Cancel an executive action in progress
     */
    cancelExecutiveAction(actionId: string): { success: boolean; error?: string } {
        const action = this.state.executiveActions.find(a => a.id === actionId);

        if (!action) {
            return { success: false, error: 'Action not found!' };
        }

        const executive = this.state.executives.find(e => e.id === action.executive_id);

        if (!executive) {
            return { success: false, error: 'Executive not found!' };
        }

        // Remove action
        this.state.executiveActions = this.state.executiveActions.filter(a => a.id !== actionId);
        executive.current_action = null;

        // Morale penalty for cancellation
        executive.morale = Math.max(0, executive.morale - 10);

        this.state.addNews(`Cancelled ${action.action_type.replace(/_/g, ' ').toLowerCase()} action`);

        return { success: true };
    }

    /**
     * Process executive actions each quarter
     */
    processExecutiveActions(): void {
        const completedActions: ExecutiveAction[] = [];

        // Decrease quarters remaining
        this.state.executiveActions.forEach(action => {
            action.quarters_remaining--;

            if (action.quarters_remaining <= 0) {
                completedActions.push(action);
            }
        });

        // Process completed actions
        completedActions.forEach(action => {
            const executive = this.state.executives.find(e => e.id === action.executive_id);

            if (executive) {
                const result = this.resolveExecutiveAction(executive, action);

                // Update executive state
                executive.current_action = null;

                if (result.success) {
                    // Gain experience
                    executive.experience_points += EXECUTIVE_XP_GAIN[executive.level];
                    executive.morale = Math.min(100, executive.morale + MORALE_CHANGES.ACTION_SUCCESS);

                    // Check for level up
                    if (executive.experience_points >= EXECUTIVE_LEVEL_UP_XP[executive.level]) {
                        this.levelUpExecutive(executive);
                    }
                } else {
                    // Morale penalty
                    executive.morale = Math.max(0, executive.morale + MORALE_CHANGES.ACTION_FAILURE);
                }

                // Add news message
                this.state.addNews(result.message);
            }

            // Remove from active actions
            this.state.executiveActions = this.state.executiveActions.filter(a => a.id !== action.id);
        });
    }

    /**
     * Resolve an executive action and return results
     */
    private resolveExecutiveAction(
        executive: Executive,
        action: ExecutiveAction
    ): ExecutiveActionResult {
        const successRate = calculateActionSuccessRate(executive, action.action_type);
        const roll = Math.random() * 100;
        const success = roll < successRate;

        // Base result
        const result: ExecutiveActionResult = {
            success,
            message: '',
            effects: {}
        };

        // Action-specific resolution
        switch (action.action_type) {
            case 'SLOT_NEGOTIATION':
                if (success) {
                    const discount = Math.floor(Math.random() * 20) + 10; // 10-30% discount
                    result.message = `${executive.name} successfully negotiated ${discount}% discount on airport slots!`;
                    result.effects!.slot_discount = discount;
                } else {
                    result.message = `${executive.name} failed to negotiate better slot prices.`;
                }
                break;

            case 'AD_CAMPAIGN':
                if (success) {
                    const reputationGain = Math.floor(Math.random() * 10) + 5; // 5-15 rep
                    this.state.reputation = Math.min(100, this.state.reputation + reputationGain);
                    result.message = `${executive.name}'s advertising campaign was successful! Reputation +${reputationGain}`;
                    result.effects!.reputation_change = reputationGain;
                } else {
                    result.message = `${executive.name}'s advertising campaign had minimal impact.`;
                }
                break;

            case 'ROUTE_ANALYSIS':
                if (success) {
                    result.message = `${executive.name} completed route analysis.`;
                    result.effects!.route_recommendations = ['Analysis complete'];
                } else {
                    result.message = `${executive.name}'s route analysis was inconclusive.`;
                }
                break;

            case 'COMPETITOR_INTEL':
                if (success) {
                    const intel = this.generateCompetitorIntel();
                    result.message = `${executive.name} gathered intelligence on competitors.`;
                    result.effects!.intel_report = intel;
                } else {
                    result.message = `${executive.name} failed to gather useful competitor intelligence.`;
                }
                break;

            case 'AIRCRAFT_DEAL':
                if (success) {
                    const discount = Math.floor(Math.random() * 15) + 5; // 5-20% discount
                    result.message = `${executive.name} negotiated ${discount}% discount on next aircraft purchase!`;
                    result.effects!.aircraft_discount = discount;
                } else {
                    result.message = `${executive.name} could not secure better aircraft prices.`;
                }
                break;

            case 'LABOR_RELATIONS':
                if (success) {
                    result.message = `${executive.name} successfully maintained good labor relations.`;
                } else {
                    result.message = `${executive.name}'s labor negotiations were tense.`;
                }
                break;

            case 'GOVT_RELATIONS':
                if (success) {
                    result.message = `${executive.name} improved government relations.`;
                } else {
                    result.message = `${executive.name}'s lobbying efforts were unsuccessful.`;
                }
                break;

            case 'HUB_DEVELOPMENT':
                if (success) {
                    const hubId = action.target;
                    if (hubId) {
                        const hubMetrics = this.state.hubMetrics.find(h => h.airport_id === hubId);
                        if (hubMetrics) {
                            hubMetrics.efficiency_rating = Math.min(100, hubMetrics.efficiency_rating + 15);
                        }
                    }
                    result.message = `${executive.name} successfully improved hub efficiency!`;
                } else {
                    result.message = `${executive.name}'s hub development project encountered delays.`;
                }
                break;
        }

        return result;
    }

    /**
     * Level up an executive
     */
    private levelUpExecutive(executive: Executive): void {
        if (executive.level === 'JUNIOR') {
            executive.level = 'SENIOR';
            executive.experience_points = 0;
            executive.salary = Math.floor(executive.salary * 1.5);
            this.state.addNews(`${executive.name} promoted to SENIOR! Salary increased.`);
        } else if (executive.level === 'SENIOR') {
            executive.level = 'EXPERT';
            executive.experience_points = 0;
            executive.salary = Math.floor(executive.salary * 1.5);
            this.state.addNews(`${executive.name} promoted to EXPERT! Salary increased.`);
        }
    }

    /**
     * Generate competitor intelligence report
     */
    private generateCompetitorIntel(): string {
        let intel = 'COMPETITOR INTELLIGENCE REPORT\n\n';

        this.state.competitors.forEach(comp => {
            intel += `${comp.name}:\n`;
            intel += `- Airports: ${comp.airports.length}\n`;
            intel += `- Cash: ~$${formatMoney(comp.cash)}\n`;
            intel += `- Strategy: ${comp.strategy}\n\n`;
        });

        return intel;
    }

    /**
     * Calculate total executive salaries per quarter
     */
    getExecutiveSalaries(): number {
        return this.state.executives.reduce((sum, exec) => sum + exec.salary, 0);
    }
}
