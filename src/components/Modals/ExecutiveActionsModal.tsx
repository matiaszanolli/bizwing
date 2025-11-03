import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Modal } from './Modal';
import { formatMoney } from '../../utils/helpers';
import { Executive, ExecutiveActionType } from '../../models/types';
import { EXECUTIVE_ACTION_COSTS, calculateActionSuccessRate } from '../../data/executives';

interface ExecutiveActionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    executive: Executive | null;
}

interface ActionInfo {
    type: ExecutiveActionType;
    name: string;
    description: string;
    icon: string;
}

const ACTIONS: ActionInfo[] = [
    {
        type: 'SLOT_NEGOTIATION',
        name: 'Slot Negotiation',
        description: 'Negotiate better airport slot prices (10-30% discount)',
        icon: '✈️'
    },
    {
        type: 'AD_CAMPAIGN',
        name: 'Advertising Campaign',
        description: 'Launch marketing campaign to boost reputation (+5-15)',
        icon: '📢'
    },
    {
        type: 'ROUTE_ANALYSIS',
        name: 'Route Analysis',
        description: 'Analyze routes for optimization opportunities',
        icon: '📊'
    },
    {
        type: 'COMPETITOR_INTEL',
        name: 'Competitor Intelligence',
        description: 'Gather detailed intelligence on competitor operations',
        icon: '🔍'
    },
    {
        type: 'AIRCRAFT_DEAL',
        name: 'Aircraft Deal',
        description: 'Negotiate discounts on next aircraft purchase (5-20%)',
        icon: '🛩️'
    },
    {
        type: 'LABOR_RELATIONS',
        name: 'Labor Relations',
        description: 'Maintain good labor relations and prevent strikes',
        icon: '🤝'
    },
    {
        type: 'GOVT_RELATIONS',
        name: 'Government Relations',
        description: 'Lobby for favorable regulations and policies',
        icon: '🏛️'
    },
    {
        type: 'HUB_DEVELOPMENT',
        name: 'Hub Development',
        description: 'Improve hub efficiency (+15% efficiency rating)',
        icon: '🏗️'
    }
];

export function ExecutiveActionsModal({ isOpen, onClose, executive }: ExecutiveActionsModalProps) {
    const { engine, state, forceUpdate } = useGame();
    const [selectedAction, setSelectedAction] = useState<ActionInfo | null>(null);

    if (!executive) return null;

    const handleAssignAction = () => {
        if (!selectedAction) return;

        const result = engine.assignExecutiveAction(executive.id, selectedAction.type);
        if (result.success) {
            forceUpdate();
            onClose();
        } else {
            alert(result.error || 'Failed to assign action');
        }
    };

    const getSuccessRate = (actionType: ExecutiveActionType) => {
        return calculateActionSuccessRate(executive, actionType);
    };

    const getSuccessRateColor = (rate: number) => {
        if (rate >= 80) return 'text-green-400';
        if (rate >= 60) return 'text-yellow-400';
        if (rate >= 40) return 'text-orange-400';
        return 'text-red-400';
    };

    const getPrimarySkill = (actionType: ExecutiveActionType) => {
        switch (actionType) {
            case 'SLOT_NEGOTIATION':
            case 'AIRCRAFT_DEAL':
                return { name: 'Negotiation', value: executive.negotiation };
            case 'AD_CAMPAIGN':
                return { name: 'Marketing', value: executive.marketing };
            case 'ROUTE_ANALYSIS':
            case 'COMPETITOR_INTEL':
                return { name: 'Analysis', value: executive.analysis };
            case 'LABOR_RELATIONS':
            case 'GOVT_RELATIONS':
            case 'HUB_DEVELOPMENT':
                return { name: 'Operations', value: executive.operations };
            default:
                return { name: 'Unknown', value: 0 };
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Assign Action - ${executive.name}`}
            size="large"
        >
            <div className="space-y-4">
                {/* Executive Info */}
                <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-white">{executive.name}</h3>
                            <p className="text-sm text-gray-400">
                                {executive.level} {executive.role} • Morale: {executive.morale}/100
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Available Cash:</p>
                            <p className="text-lg font-bold text-green-400">
                                ${formatMoney(state.cash)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {ACTIONS.map((action) => {
                        const actionCost = EXECUTIVE_ACTION_COSTS[action.type];
                        const successRate = getSuccessRate(action.type);
                        const primarySkill = getPrimarySkill(action.type);
                        const canAfford = state.canAfford(actionCost.cost);

                        return (
                            <div
                                key={action.type}
                                onClick={() => canAfford && setSelectedAction(action)}
                                className={`bg-gray-750 rounded-lg p-4 cursor-pointer transition-all border-2 ${
                                    !canAfford
                                        ? 'opacity-50 cursor-not-allowed border-gray-700'
                                        : selectedAction?.type === action.type
                                        ? 'border-blue-500 bg-gray-700'
                                        : 'border-transparent hover:border-gray-600'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="text-3xl">{action.icon}</div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white mb-1">{action.name}</h4>
                                        <p className="text-xs text-gray-400 mb-2">{action.description}</p>

                                        <div className="space-y-1 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Cost:</span>
                                                <span className={`font-semibold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                                                    ${formatMoney(actionCost.cost)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Duration:</span>
                                                <span className="text-white font-semibold">
                                                    {actionCost.duration} quarter{actionCost.duration !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Primary Skill:</span>
                                                <span className="text-white font-semibold">
                                                    {primarySkill.name} ({primarySkill.value})
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Success Rate:</span>
                                                <span className={`font-bold ${getSuccessRateColor(successRate)}`}>
                                                    {successRate}%
                                                </span>
                                            </div>
                                        </div>

                                        {selectedAction?.type === action.type && (
                                            <div className="mt-2 pt-2 border-t border-gray-700">
                                                <div className="flex items-center gap-1 text-xs text-blue-400">
                                                    <span>✓</span>
                                                    <span>Selected</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Info Box */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-3 text-sm text-gray-300">
                    <p className="font-semibold text-blue-400 mb-1">💡 Action Tips:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Actions are paid upfront and execute automatically over time</li>
                        <li>Higher skills and morale increase success rates</li>
                        <li>Executives gain experience from successful actions</li>
                        <li>Failed actions still provide some experience</li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400">
                        {selectedAction ? (
                            <span>
                                Selected: <span className="text-white font-semibold">{selectedAction.name}</span>
                                {' '}(${formatMoney(EXECUTIVE_ACTION_COSTS[selectedAction.type].cost)})
                            </span>
                        ) : (
                            <span>Select an action to assign</span>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAssignAction}
                            disabled={
                                !selectedAction ||
                                !state.canAfford(EXECUTIVE_ACTION_COSTS[selectedAction?.type || 'SLOT_NEGOTIATION'].cost)
                            }
                            className={`px-4 py-2 rounded transition-colors font-medium ${
                                selectedAction && state.canAfford(EXECUTIVE_ACTION_COSTS[selectedAction.type].cost)
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {selectedAction && !state.canAfford(EXECUTIVE_ACTION_COSTS[selectedAction.type].cost)
                                ? 'Insufficient Funds'
                                : 'Assign Action'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
