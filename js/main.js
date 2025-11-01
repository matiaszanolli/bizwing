// Main entry point
import { GameController } from './engine/GameController.js';

// Start game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const game = new GameController();
    game.start();

    // Expose game instance for debugging
    window.game = game;

    console.log('Aerobiz Supersonic loaded successfully!');
    console.log('Access game instance via window.game');
});
