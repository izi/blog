import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import d3 = require('d3');

class GameOfLifeBoard {
  board: number[][];

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
        if (this.board[i][j] == 1 && (liveNeighbours == 2 || liveNeighbours == 3)) {
          newBoard[i][j] = 1;
        } else if (this.board[i][j] == 0 && liveNeighbours == 3) {
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
        if (!(i == row && j == col)) {
          var r = i < 0 ? i + this.height : (i >= this.height ? i - this.height : i);
          var c = j < 0 ? j + this.width : (j >= this.width ? j - this.width : j);

          // if (this.board[row][col] == 1) {
            // console.log(i, j, r, c);
          // }

          liveNeighbours += this.board[r][c];
          // if (!(i == row && col == j) && (i >= 0 && i < this.height && j >= 0 && j < this.width)) {
          // liveNeighbours += this.board[i][j];
          // }
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

class GameOfLifeBoardPattern {


  static block() {
    return new GameOfLifeBoard(4, 4, [1, 1], [1, 2], [2, 1], [2, 2]);
  }

  static beehive() {
    return new GameOfLifeBoard(5, 6, [2, 1], [1, 2], [1, 3], [3, 2], [3, 3], [2, 4]);
  }

  static loaf() {
    return new GameOfLifeBoard(6, 6, [2, 1], [1, 2], [1, 3], [3, 2], [4, 3], [2, 4], [3, 4]);
  }

  static boat() {
    return new GameOfLifeBoard(5, 5, [1, 1], [1, 2], [2, 1], [2, 3], [3, 2]);
  }

  static tub() {
    return new GameOfLifeBoard(5, 5, [1, 2], [2, 1], [2, 3], [3, 2]);
  }

  static blinker() {
    return new GameOfLifeBoard(5, 5, [1, 2], [2, 2], [3, 2]);
  }

  static toad() {
    return new GameOfLifeBoard(6, 6, [2, 2], [2, 3], [2, 4], [3, 1], [3, 2], [3, 3]);
  }

  static beacon() {
    return new GameOfLifeBoard(6, 6, [1, 1], [1, 2], [2, 1], [4, 3], [4, 4], [3, 4]);
  }

  static glider() {
    return new GameOfLifeBoard(6, 6, [1, 1], [2, 2], [2, 3], [3, 1], [3, 2]);
  }

  static spaceship() {
    return new GameOfLifeBoard(10, 10, [1, 1], [1, 4], [3, 1], [4, 2], [4, 3], [4, 4], [4, 5], [3, 5], [2, 5]);
  }

  static gosperGliderGun() {
    return new GameOfLifeBoard(50, 50, [5, 1], [5, 2], [6, 1], [6, 2], [5, 11], [6, 11], [7, 11], [4, 12], [8, 12], [3, 13], [9, 13], [3, 14], [9, 14], [6, 15], [4, 16], [8, 16], [5, 17], [6, 17], [7, 17], [6, 18], [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25], [3, 35], [4, 35], [3, 36], [4, 36]);
  }
}

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit {

  row: d3.Selection<d3.BaseType, number[], d3.BaseType, {}>;
  grid: d3.Selection<d3.BaseType, {}, null, undefined>;
  game = new GameOfLifeBoard(50, 50);
  width = 500;
  height = 500;
  elHeight;
  elWidth;

  constructor(private element: ElementRef) {
    console.log('Game of life');

    this.game.random();
    this.game = GameOfLifeBoardPattern.blinker();

    this.elHeight = this.height / this.game.height;
    this.elWidth = this.width / this.game.width;

    const timer = Observable.timer(1000, 1000);

    var sub = timer.subscribe(t => {
      this.game.next();
      this.drawBoard();
    });
  }

  ngOnInit() {
    this.grid = d3.select(this.element.nativeElement).select('#game-of-life-svg')
      .append('svg')
      .attr('width', this.width + 'px')
      .attr('height', this.height + 'px');

    const h = this.elHeight;
    const w = this.elWidth;
    
    this.row = this.grid.selectAll('.row')
      .data(this.game.board)
      .enter().append('g')
      .attr('class', 'row')
      .attr('transform', function (d, i) { return 'translate(0 ' + i * h + ')'; });

    const column = this.row.selectAll('.square')
      .data(function (d) { return d; })
      .enter().append('rect')
      .attr('class', 'square')
      .attr('x', function (d, i) { return i * w; })
      // .attr("y", function (d, i) { return 0; })
      .attr('width', function (d, i) { return w; })
      .attr('height', function (d, i) { return h; })
      .style('fill', function (d): string { return d == 0 ? '#fff' : '#000'; })
      .style('stroke', '#222');

    this.drawBoard();
  }

  drawBoard() {
    const h = this.elHeight;
    const w = this.elWidth;

    this.row = this.grid.selectAll('.row')
      .data(this.game.board);

    const column = this.row.selectAll('.square')
      .data(function (d) { return d; })
      .transition()
      .duration(1000)
      .style('fill', function (d): string {
        return d == 0 ? '#fff' : '#000';
      })
  }
}
