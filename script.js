import Game from './src/game.js';
import View from './src/view.js';

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 480, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 37: //left
            game.movePieceLeft();
            view.renderMainScreen(game.getState());
            break;
        case 38: //up
            game.rotatePiece();
            view.renderMainScreen(game.getState());
            break;
        case 39: //right
            game.movePieceRight();
            view.renderMainScreen(game.getState());
            break;
        case 40: //down
            game.movePieceDown();
            view.renderMainScreen(game.getState());
            break;
    }
});

view.renderMainScreen(game.getState());