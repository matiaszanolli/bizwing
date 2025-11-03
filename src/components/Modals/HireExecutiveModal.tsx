import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Modal } from './Modal';
import { formatMoney } from '../../utils/helpers';
import { Executive, ExecutiveRole, ExecutiveLevel } from '../../models/types';
import { generateExecutivePool } from '../../data/executives';

interface HireExecutiveModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HireExecutiveModal({ isOpen, onClose }: HireExecutiveModalProps) {
    const { engine, state, forceUpdate } = useGame();
    const [candidates, setCandidates] = useState<Executive[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<Executive | null>(null);
    const [filterRole, setFilterRole] = useState<ExecutiveRole | 'ALL'>('ALL');
    const [filterLevel, setFilterLevel] = useState<ExecutiveLevel | 'ALL'>('ALL');

    // Generate candidate pool when modal opens
    useEffect(() => {
        if (isOpen) {
            const pool = generateExecutivePool(12);
            setCandidates(pool);
            setSelectedCandidate(null);
        }
    }, [isOpen]);

    const handleHire = () => {
        if (!selectedCandidate) return;

        const result = engine.hireExecutive(selectedCandidate);
        if (result.success) {
            forceUpdate();
            onClose();
        } else {
            alert(result.error || 'Failed to hire executive');
        }
    };

    const filteredCandidates = candidates.filter(candidate => {
        if (filterRole !== 'ALL' && candidate.role !== filterRole) return false;
        if (filterLevel !== 'ALL' && candidate.level !== filterLevel) return false;
        // Hide roles we already have
        if (state.executives.some(e => e.role === candidate.role)) return false;
        return true;
    });

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

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Hire Executive"
            size="large"
        >
            <div className="space-y-4">
                {/* Filters */}
                <div className="flex gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Role
                        </label>
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value as ExecutiveRole | 'ALL')}
                            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="ALL">All Roles</option>
                            <option value="MARKETING">Marketing</option>
                            <option value="OPERATIONS">Operations</option>
                            <option value="FINANCE">Finance</option>
                            <option value="STRATEGY">Strategy</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Level
                        </label>
                        <select
                            value={filterLevel}
                            onChange={(e) => setFilterLevel(e.target.value as ExecutiveLevel | 'ALL')}
                            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="ALL">All Levels</option>
                            <option value="JUNIOR">Junior</option>
                            <option value="SENIOR">Senior</option>
                            <option value="EXPERT">Expert</option>
                        </select>
                    </div>

                    <div className="flex-1 flex items-end">
                        <button
                            onClick={() => setCandidates(generateExecutivePool(12))}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors text-sm"
                        >
                            🔄 Refresh Pool
                        </button>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-3 text-sm text-gray-300">
                    <p className="font-semibold text-blue-400 mb-1">💡 Hiring Tips:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>You can hire up to 4 executives (one per role)</li>
                        <li>Higher level executives have better skills but cost more</li>
                        <li>Executives gain experience and can be promoted</li>
                        <li>Each executive can perform one action per quarter</li>
                    </ul>
                </div>

                {/* Candidates List */}
                <div className="max-h-96 overflow-y-auto space-y-2">
                    {filteredCandidates.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <p>No candidates match your filters</p>
                            <p className="text-sm mt-2">Try adjusting filters or refreshing the pool</p>
                        </div>
                    ) : (
                        filteredCandidates.map((candidate) => (
                            <div
                                key={candidate.id}
                                onClick={() => setSelectedCandidate(candidate)}
                                className={`bg-gray-750 rounded-lg p-4 cursor-pointer transition-all border-2 ${
                                    selectedCandidate?.id === candidate.id
                                        ? 'border-blue-500 bg-gray-700'
                                        : 'border-transparent hover:border-gray-600'
                                }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${getRoleBadgeColor(candidate.role)}`}>
                                                {candidate.role}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${getLevelBadgeColor(candidate.level)}`}>
                                                {candidate.level}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-2">
                                            <div>
                                                <span className="text-gray-400">Negotiation:</span>
                                                <span className="text-white ml-2 font-semibold">{candidate.negotiation}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Marketing:</span>
                                                <span className="text-white ml-2 font-semibold">{candidate.marketing}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Analysis:</span>
                                                <span className="text-white ml-2 font-semibold">{candidate.analysis}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Operations:</span>
                                                <span className="text-white ml-2 font-semibold">{candidate.operations}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-green-400 font-semibold">
                                            Salary: ${formatMoney(candidate.salary)}/quarter
                                        </p>
                                    </div>

                                    {selectedCandidate?.id === candidate.id && (
                                        <div className="ml-4">
                                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                                <span className="text-white text-sm">✓</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400">
                        {selectedCandidate ? (
                            <span>
                                Selected: <span className="text-white font-semibold">{selectedCandidate.name}</span>
                                {' '}(${formatMoney(selectedCandidate.salary)}/quarter)
                            </span>
                        ) : (
                            <span>Select a candidate to hire</span>
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
                            onClick={handleHire}
                            disabled={!selectedCandidate || !state.canAfford(selectedCandidate?.salary || 0)}
                            className={`px-4 py-2 rounded transition-colors font-medium ${
                                selectedCandidate && state.canAfford(selectedCandidate.salary)
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {selectedCandidate && !state.canAfford(selectedCandidate.salary)
                                ? 'Insufficient Funds'
                                : 'Hire Executive'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
