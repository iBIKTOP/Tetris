export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    activePiece = {
        x: 0,
        y: 0,
        blocks: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    };

    movePiaceLeft() {
        this.activePiece.x -= 1;
        if (this.hasCollision()) this.activePiece.x += 1;
    }
    movePiaceRight() {
        this.activePiece.x += 1;
        if (this.hasCollision()) this.activePiece.x -= 1;
    }
    movePiaceDown() {
        this.activePiece.y += 1;
        if (this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
        }

    }
    // constructor() {
    //     this.points = {
    //         '1': 40,
    //         '2': 100,
    //         '3': 300,
    //         '4': 1200
    //     };
    //     this.score = 0;
    //     this.lines = 8;
    //     this.playfield = this.createPlayfield();
    //     this.activePiece = this.createPiece();
    //     this.nextPiece = this.createPiece();
    // }
    // get level() {
    //     return Math.floor(this.lines * 0.1);
    // }

    // getState() {
    //     const playfield = this.createPlayfield();

    //     //копируем поле во временный массив playfield
    //     for (let y = 0; y < this.playfield.length; y++) {
    //         playfield[y] = [];
    //         for (let x = 0; x < this.playfield[y].length; x++) {
    //             playfield[y][x] = this.playfield[y][x];
    //         }
    //     }
    //     //переносим блок во временное поле
    //     for (let y = 0; y < this.activePiece.blocks.length; y++) {
    //         for (let x = 0; x < this.activePiece.blocks[y].length; x++) {
    //             if (this.activePiece.blocks[y][x]) {
    //                 playfield[this.activePiece.y + y][this.activePiece.x + x] = this.activePiece.blocks[y][x];
    //             }
    //         }
    //     }
    //     return playfield;
    // }
    // //функция для создания пустого игрового поля
    // createPlayfield() {
    //     const playfield = [];
    //     for (let y = 0; y < 20; y++) {
    //         playfield[y] = [];
    //         for (let x = 0; x < 10; x++) {
    //             playfield[y][x] = 0;
    //         }
    //     }
    //     return playfield;
    // }

    // //функция для создания одного из блоков TETRIS
    // createPiece() {
    //     const index = Math.floor(Math.random() * 7);
    //     const type = 'IJLOSTZ'[index];
    //     const piece = {};
    //     switch (type) {
    //         case 'I':
    //             piece.blocks = [
    //                 [0, 0, 0, 0],
    //                 [1, 1, 1, 1],
    //                 [0, 0, 0, 0],
    //                 [0, 0, 0, 0]
    //             ];
    //             break;
    //         case 'J':
    //             piece.blocks = [
    //                 [0, 0, 0],
    //                 [2, 2, 2],
    //                 [0, 0, 2]
    //             ];
    //             break;
    //         case 'L':
    //             piece.blocks = [
    //                 [0, 0, 0],
    //                 [3, 3, 3],
    //                 [3, 0, 0]
    //             ];
    //             break;
    //         case 'O':
    //             piece.blocks = [
    //                 [0, 0, 0, 0],
    //                 [0, 4, 4, 0],
    //                 [0, 4, 4, 0],
    //                 [0, 0, 0, 0]
    //             ];
    //             break;
    //         case 'S':
    //             piece.blocks = [
    //                 [0, 0, 0],
    //                 [0, 5, 5],
    //                 [5, 5, 0]
    //             ];
    //             break;
    //         case 'T':
    //             piece.blocks = [
    //                 [0, 0, 0],
    //                 [6, 6, 6],
    //                 [0, 6, 0]
    //             ];
    //             break;
    //         case 'Z':
    //             piece.blocks = [
    //                 [0, 0, 0],
    //                 [7, 7, 0],
    //                 [0, 7, 7]
    //             ];
    //             break;
    //         default:
    //             throw new Error('Неизвестный тип фигуры');
    //     }
    //     piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
    //     piece.y = -1;//делается чтобы фигура появлялась на 1 строку выше
    //     return piece;
    // }

    // //двигаем фигуру в лево
    // muvePieceLeft() {
    //     this.activePiece.x -= 1;
    //     if (this.hasCollision()) {
    //         this.activePiece.x += 1;
    //     }
    // }

    // //двигаем фигуру в право
    // muvePieceRight() {
    //     this.activePiece.x += 1;
    //     if (this.hasCollision()) {
    //         this.activePiece.x -= 1;
    //     }
    // }

    // //двигаем фигуру в низ
    // muvePieceDown() {
    //     this.activePiece.y += 1;
    //     if (this.hasCollision()) {
    //         this.activePiece.y -= 1;
    //         //если фигура столкнулась с полом или другой фигурой - фиксируем ее.
    //         this.lockPiece();
    //         const clearLines = this.clearLines(); //выполняем функцию и записываем количество уданенных линий
    //         this.updateScore(clearLines);
    //         //
    //         this.updatePieces();
    //     }
    // }

    rotatePiece() {
        const blocks = this.activePiece.blocks;
        const length = blocks.length;
        const temp = [];
        for (let i = 0; i < length; i++) {
            temp[i] = new Array(length).fill(0);
        }
        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                temp[x][y] = blocks[length - 1 - y][x];
            }
        }
        this.activePiece.blocks = temp;
        if (this.hasCollision()) {
            this.activePiece.blocks = blocks;
        }
    }

    hasCollision() {//проверка выхода фигуры за пределы поля и столкновения 
        const playfield = this.playfield;
        const { y: pieseY, x: pieseX, blocks } = this.activePiece;
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x] &&//<-- есть ли в ячейке 1
                    ((playfield[pieseY + y] === undefined || playfield[pieseY + y][pieseX + x] === undefined) ||
                        playfield[pieseY + y][pieseX + x])) {
                    console.log("has collision");
                    return true;
                }
            }
        }
        console.log("hasn't collision");
        return false;
    }
    lockPiece() {//фиксируем наш блок в игровом поле
        const { y: pieseY, x: pieseX, blocks } = this.activePiece;
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {//если в ячейке нули то они не копируются.
                    this.playfield[pieseY + y][pieseX + x] = blocks[y][x];
                }

            }
        }
    }

    // clearLines() {
    //     const rows = 20;
    //     const columns = 10;
    //     let lines = [];

    //     for (let y = rows - 1; y >= 0; y--) {
    //         let numberOfBlocks = 0;
    //         for (let x = 0; x < columns; x++) {
    //             if (this.playfield[y][x]) {
    //                 numberOfBlocks += 1;
    //             }
    //         }
    //         if (numberOfBlocks === 0) {
    //             break;
    //         }
    //         else if (numberOfBlocks < columns) {
    //             continue;
    //         }
    //         else if (numberOfBlocks === columns) {
    //             lines.unshift(y);
    //         }
    //     }

    //     //удаление строк
    //     for (let index of lines) {
    //         this.playfield.splice(index, 1);
    //         this.playfield.unshift(new Array(columns).fill(0));
    //     }
    //     return lines.length;
    // }

    // updateScore(cleanedLines) {
    //     if (cleanedLines > 0) {
    //         this.score += this.points[cleanedLines] * (this.level + 1);
    //         this.lines += cleanedLines;
    //         console.log(this.level, this.score, this.lines);
    //     }

    // }

    // updatePieces() {
    //     this.activePiece = this.nextPiece;
    //     this.nextPiece = this.createPiece();
    // }
}