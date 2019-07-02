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

        this.blockWidth = this.width / columns;
        this.blockHeight = this.height / rows;

        this.element.appendChild(this.canvas);
    }

    render(playfield) {
        //очищаем холст
        this.clearScreen();
        //пробегаем по полю и окрашиваем на холсте новое положение фигуры
        this.renderPlayfield(playfield);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    renderPlayfield(playfield) {
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (block) {
                    this.renderBlock(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight, this.colors[block]);
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