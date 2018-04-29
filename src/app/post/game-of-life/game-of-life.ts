export class GameOfLife {
    board: number[][];
    infiniteSpace = true;

    constructor(public height: number, public width: number, ...elements: Array<[number, number]>) {
        this.board = this.empty();
        if (elements) {
            elements.forEach(e => this.board[e[0]][e[1]] = 1);
        }
    }

    next() {
        const newBoard = this.empty();

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const liveNeighbours = this.liveNeighbours(i, j);
                if (this.board[i][j] === 1 && (liveNeighbours === 2 || liveNeighbours === 3)) {
                    newBoard[i][j] = 1;
                } else if (this.board[i][j] === 0 && liveNeighbours === 3) {
                    newBoard[i][j] = 1;
                } else {
                    newBoard[i][j] = 0;
                }
            }
        }

        this.board = newBoard;
    }

    liveNeighbours(row: number, col: number) {
        let liveNeighbours = 0;

        for (let i: number = row - 1; i <= row + 1; i++) {
            for (let j: number = col - 1; j <= col + 1; j++) {
                if (!(i === row && j === col)) {
                    if (this.infiniteSpace) {
                        const r = i < 0 ? i + this.height : (i >= this.height ? i - this.height : i);
                        const c = j < 0 ? j + this.width : (j >= this.width ? j - this.width : j);
                        liveNeighbours += this.board[r][c];
                    } else {
                        if (!(i === row && col === j) && (i >= 0 && i < this.height && j >= 0 && j < this.width)) {
                            liveNeighbours += this.board[i][j];
                        }
                    }
                }
            }
        }

        return liveNeighbours;
    }

    random() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.board[i][j] = Math.random() > 0.5 ? 1 : 0;
            }
        }
    }

    empty() {
        const board = Array<Array<number>>(this.height);
        for (let i = 0; i < this.height; i++) {
            board[i] = [];
            for (let j = 0; j < this.width; j++) {
                board[i][j] = 0;
            }
        }

        return board;
    }
}

export class GameOfLifePattern {
    static block() {
        return new GameOfLife(4, 4, [1, 1], [1, 2], [2, 1], [2, 2]);
    }

    static beehive() {
        return new GameOfLife(5, 6, [2, 1], [1, 2], [1, 3], [3, 2], [3, 3], [2, 4]);
    }

    static loaf() {
        return new GameOfLife(6, 6, [2, 1], [1, 2], [1, 3], [3, 2], [4, 3], [2, 4], [3, 4]);
    }

    static boat() {
        return new GameOfLife(5, 5, [1, 1], [1, 2], [2, 1], [2, 3], [3, 2]);
    }

    static tub() {
        return new GameOfLife(5, 5, [1, 2], [2, 1], [2, 3], [3, 2]);
    }

    static blinker() {
        return new GameOfLife(5, 5, [1, 2], [2, 2], [3, 2]);
    }

    static toad() {
        return new GameOfLife(6, 6, [2, 2], [2, 3], [2, 4], [3, 1], [3, 2], [3, 3]);
    }

    static beacon() {
        return new GameOfLife(6, 6, [1, 1], [1, 2], [2, 1], [4, 3], [4, 4], [3, 4]);
    }

    static glider() {
        return new GameOfLife(6, 6, [1, 1], [2, 2], [2, 3], [3, 1], [3, 2]);
    }

    static spaceship() {
        return new GameOfLife(10, 10, [1, 1], [1, 4], [3, 1], [4, 2], [4, 3], [4, 4], [4, 5], [3, 5], [2, 5]);
    }

    static gosperGliderGun() {
        let game = new GameOfLife(50, 50,
            [5, 1], [5, 2], [6, 1], [6, 2],
            [5, 11], [6, 11], [7, 11], [4, 12], [8, 12], [3, 13], [9, 13], [3, 14], [9, 14], [6, 15],
            [4, 16], [8, 16], [5, 17], [6, 17], [7, 17], [6, 18],
            [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25],
            [3, 35], [4, 35], [3, 36], [4, 36]
        );

        game.infiniteSpace = false;
        return game;
    }

    static line(size: number) {
        const game = new GameOfLife(size, size);

        const row = size / 2;
        for (let col = 0; col < size; col++) {
            game.board[row][col] = 1;
        }

        return game;
    }
}
