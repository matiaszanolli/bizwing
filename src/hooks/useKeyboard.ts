// Keyboard shortcuts hook

import { useEffect } from 'react';

interface KeyboardShortcuts {
    [key: string]: () => void;
}

export function useKeyboard(shortcuts: KeyboardShortcuts) {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Don't trigger shortcuts when typing in inputs
            if (e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                e.target instanceof HTMLSelectElement) {
                return;
            }

            const key = e.key.toLowerCase();

            if (shortcuts[key]) {
                e.preventDefault();
                shortcuts[key]();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [shortcuts]);
}
