import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';
import { Executive } from '../../models/types';

interface ExecutivePanelProps {
    onHireExecutive: () => void;
    onAssignAction: (executive: Executive) => void;
}

export function ExecutivePanel({ onHireExecutive, onAssignAction }: ExecutivePanelProps) {
    const { state } = useGame();
    const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null);

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'MARKETING': return 'bg-blue-600';
            case 'OPERATIONS': return 'bg-green-600';
            case 'FINANCE': return 'bg-yellow-600';
            case 'STRATEGY': return 'bg-purple-600';
            default: return 'bg-gray-600';
        }
    };

    const getLevelBadgeColor = (level: string) => {
        switch (level) {
            case 'JUNIOR': return 'bg-gray-500';
            case 'SENIOR': return 'bg-blue-500';
            case 'EXPERT': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    const getMoraleColor = (morale: number) => {
        if (morale >= 75) return 'text-green-400';
        if (morale >= 50) return 'text-yellow-400';
        if (morale >= 25) return 'text-orange-400';
        return 'text-red-400';
    };

    const getMoraleBar = (morale: number) => {
        const percentage = Math.max(0, Math.min(100, morale));
        let colorClass = 'bg-green-500';
        if (morale < 75) colorClass = 'bg-yellow-500';
        if (morale < 50) colorClass = 'bg-orange-500';
        if (morale < 25) colorClass = 'bg-red-500';

        return (
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                <div
                    className={`${colorClass} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        );
    };

    const getXPBar = (executive: Executive) => {
        const { experience_points, level } = executive;
        const xpRequired = level === 'JUNIOR' ? 500 : level === 'SENIOR' ? 1000 : 99999;
        const percentage = level === 'EXPERT' ? 100 : Math.min(100, (experience_points / xpRequired) * 100);

        return (
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        );
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Executive Team</h2>
                {state.executives.length < 4 && (
                    <button
                        onClick={onHireExecutive}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        + Hire Executive
                    </button>
                )}
            </div>

            {state.executives.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No executives hired yet</p>
                    <p className="text-sm text-gray-500 mb-4">
                        Hire executives to perform special actions each quarter
                    </p>
                    <button
                        onClick={onHireExecutive}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                        Hire Your First Executive
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {state.executives.map((exec) => (
                        <div
                            key={exec.id}
                            className={`bg-gray-750 rounded-lg p-4 border-2 transition-all ${
                                selectedExecutive?.id === exec.id
                                    ? 'border-blue-500'
                                    : 'border-transparent hover:border-gray-600'
                            }`}
                            onClick={() => setSelectedExecutive(exec)}
                        >
                            {/* Header Row */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-white">{exec.name}</h3>
                                        <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${getRoleBadgeColor(exec.role)}`}>
                                            {exec.role}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${getLevelBadgeColor(exec.level)}`}>
                                            {exec.level}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Salary: ${formatMoney(exec.salary)}/quarter
                                    </p>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAssignAction(exec);
                                    }}
                                    disabled={!!exec.current_action}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                                        exec.current_action
                                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                            : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                                >
                                    {exec.current_action ? 'Busy' : 'Assign Action'}
                                </button>
                            </div>

                            {/* Skills Grid */}
                            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                                <div>
                                    <span className="text-gray-400">Negotiation:</span>
                                    <span className="text-white ml-2 font-semibold">{exec.negotiation}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Marketing:</span>
                                    <span className="text-white ml-2 font-semibold">{exec.marketing}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Analysis:</span>
                                    <span className="text-white ml-2 font-semibold">{exec.analysis}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Operations:</span>
                                    <span className="text-white ml-2 font-semibold">{exec.operations}</span>
                                </div>
                            </div>

                            {/* Morale */}
                            <div className="mb-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Morale:</span>
                                    <span className={`font-semibold ${getMoraleColor(exec.morale)}`}>
                                        {exec.morale}/100
                                    </span>
                                </div>
                                {getMoraleBar(exec.morale)}
                            </div>

                            {/* Experience */}
                            {exec.level !== 'EXPERT' && (
                                <div className="mb-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Experience:</span>
                                        <span className="text-blue-400 font-semibold">
                                            {exec.experience_points}/{exec.level === 'JUNIOR' ? 500 : 1000} XP
                                        </span>
                                    </div>
                                    {getXPBar(exec)}
                                </div>
                            )}

                            {/* Current Action */}
                            {exec.current_action && (
                                <div className="mt-3 pt-3 border-t border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-yellow-400">
                                                🔄 {exec.current_action.action_type.replace(/_/g, ' ')}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Completes in {exec.current_action.quarters_remaining} quarter
                                                {exec.current_action.quarters_remaining !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Summary Stats */}
            {state.executives.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Total Executives:</span>
                            <span className="text-white ml-2 font-semibold">{state.executives.length}/4</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Total Salaries:</span>
                            <span className="text-white ml-2 font-semibold">
                                ${formatMoney(state.executives.reduce((sum, e) => sum + e.salary, 0))}/quarter
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-400">Active Actions:</span>
                            <span className="text-white ml-2 font-semibold">
                                {state.executiveActions.length}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-400">Available:</span>
                            <span className="text-white ml-2 font-semibold">
                                {state.executives.filter(e => !e.current_action).length}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
