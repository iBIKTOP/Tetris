export default class View {
    constructor(element, width, height, rows, columns) {
        this.colors = {
            '1': 'cyan',
            '2': 'blue',
            '3': 'orange',
            '4': 'yellow',
            '5': 'green',
            '6': 'purple',
            '7': 'red'
        };
        this.element = element;
        this.width = width;
        this.height = height;

        //создаем элемент canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        //рисуем границы игрового поля
        this.playfieldBorderWidth = 4; //4px
        this.playfieldX = this.playfieldBorderWidth;//игровое поле начинается с 4пх чтобы граница не мешала
        this.playfieldY = this.playfieldBorderWidth;
        this.playfieldWidth = this.width / 3 * 2;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        //рисуем размеры блока
        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        //рисуем границы панели
        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);
    }

    renderMainScreen(state) {
        //очищаем холст
        this.clearScreen();
        //пробегаем по полю и окрашиваем на холсте новое положение фигуры
        this.renderPlayfield(state);
        this.renderPanel(state);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '28px Press Start 2P';
        this.context.textAlign = 'center';
        this.context.textBaseline = "middle";
        this.context.fillText('Press Enter to Start', this.width / 2, this.height / 2);
    }
    renderPauseScreen() {
        this.context.fillStyle = 'rgba(0,0,0,0,0.75)';
        this.context.fillRect(0, 0, this.width, this.height)

        this.context.fillStyle = 'white';
        this.context.font = '28px Press Start 2P';
        this.context.textAlign = 'center';
        this.context.textBaseline = "middle";
        this.context.fillText('Press Enter to Resume', this.width / 2, this.height / 2);
    }
    renderEndScreen({ score }) {
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '28px Press Start 2P';
        this.context.textAlign = 'center';
        this.context.textBaseline = "middle";
        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
    }
    renderPlayfield({ playfield }) {
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (block) {
                    //рисуем блок. принимает рассояние х и у в пх, размеры блока и цвет
                    this.renderBlock(
                        this.playfieldX + (x * this.blockWidth),
                        this.playfieldY + (y * this.blockHeight),
                        this.blockWidth,
                        this.blockHeight,
                        this.colors[block]);
                }
            }
        }
        this.context.strokeStyle = 'white'; //цвет границы
        this.context.lineWidth = this.playfieldBorderWidth; //ширина границы
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }
    renderPanel({ level, score, lines, nextPiece }) {
        this.context.textAlign = 'start'; //выравнивание текста
        this.context.textBaseline = 'top'; //выравнивание текста по верхнему краю
        this.context.fillStyle = 'white'; //цвет текста
        this.context.font = '14px "Press Start 2P"';

        this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
        this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
        this.context.fillText(`Next:`, this.panelX, this.panelY + 96);

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];
                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth) * 0.5,
                        this.panelY + 100 + (y * this.blockHeight) * 0.5,
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        this.colors[block]
                    );
                }
            }

        }
    }
    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);//заливка
        this.context.strokeRect(x, y, width, height);//обводка
    }
}