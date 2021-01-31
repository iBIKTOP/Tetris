export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervaiID = null;
        this.isPlaying = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.view.renderStartScreen();
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }
    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }
    reset() {
        this.game.reset();
        this.play();
    }
    updateView() {
        const state = this.game.getState();

        if (state.isGameOver) {
            this.view.renderEndScreen(state);
        } else {
            if (!this.isPlaying) {
                this.view.renderPauseScreen();
            } else {
                this.view.renderMainScreen(this.game.getState());
            }
        }

    }
    startTimer() {
        //делаем ускорее по уровню
        const speed = 1000 - this.game.getState().level * 100;

        if (!this.intervaiID) {
            this.intervaiID = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100);//на 10 уровне скорость будет = 0, поэтому тут проверка
        }
    }
    stopTimer() {
        if (this.intervaiID) {
            clearInterval(this.intervaiID);
            this.intervaiID = null;
        }
    }
    handleKeyDown(e) {
        const state = this.game.getState();

        switch (e.keyCode) {
            case 13://Enter
                if (state.isGameOver) {
                    this.reset();
                } else if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 37: //left
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 38: //up
                this.game.rotatePiece();
                this.updateView();
                break;
            case 39: //right
                this.game.movePieceRight();
                this.updateView();
                break;
            case 40: //down
                this.stopTimer();//останавливаем таймер
                this.game.movePieceDown();
                this.updateView();
                break;
        }
    }
    handleKeyUp(e) {
        switch (e.keyCode) {
            case 40: //down
                this.startTimer();//возобнавляем таймер
                break;
        }
    }
}