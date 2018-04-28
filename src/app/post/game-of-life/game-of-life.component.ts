import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import d3 = require('d3');

class GameOfLifeBoard {
  board: number[][];

  constructor(public height, public width) {
    this.board = this.empty();
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
        if (!(i == row && col == j) && (i >= 0 && i < this.height && j >= 0 && j < this.width)) {
          liveNeighbours += this.board[i][j];
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
  elHeight = this.height / this.game.height;
  elWidth = this.width / this.game.width;

  constructor(private element: ElementRef) {
    console.log('Game of life');

    this.game.random();
    const timer = Observable.timer(1000, 1000);

    timer.subscribe(t => {
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
    // this.row.remove();
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
      .style('stroke', '#222')
      // .exit()

      // .transition()
      // .duration(600)
      // .styleTween("fill", function (d, i) { return d3.interpolate(d == 0 ? '#fff' : '#000', d == 0 ? '#000' : '#fff'); });

    this.drawBoard();
  }

  drawBoard() {
    const h = this.elHeight;
    const w = this.elWidth;

    this.row =  this.grid.selectAll('.row')
      .data(this.game.board);
      // .remove();
      
      const column = this.row.selectAll('.square')
      .data(function (d) { return d; })      
      // .style('fill', function (d): string { 
        // console.log("test " + d);
        // return d == 0 ? '#fff' : '#000';
      // })

      // .enter()
      .transition()
      .duration(1000)
      .style('fill', function (d): string { 
        // console.log("test " + d);
        return d == 0 ? '#fff' : '#000';
      })

      // .styleTween("fill", function (d, i, e) { return d3.interpolate(d == 0 ? '#000' : '#fff', d == 0 ? '#fff' : '#000'); });

      // .enter().append('g')
      // .attr('transform', function (d, i) { return 'translate(0 ' + i * h + ')'; });
  }
}
