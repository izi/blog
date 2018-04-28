import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import d3 = require('d3');
import { GameOfLife, GameOfLifePattern } from './game-of-life';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit {

  row: d3.Selection<d3.BaseType, number[], d3.BaseType, {}>;
  grid: d3.Selection<d3.BaseType, {}, null, undefined>;
  game = new GameOfLife(50, 50);
  width = 500;
  height = 500;
  elHeight;
  elWidth;

  constructor(private element: ElementRef) {
    console.log('Game of life');

    this.game.random();
    this.game = GameOfLifePattern.spaceship();

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
