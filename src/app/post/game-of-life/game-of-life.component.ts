import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import * as d3 from 'd3';
import { GameOfLife, GameOfLifePattern } from './game-of-life';
import { GameOfLifeSVG } from './game-of-life-svg';

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

    const gameTimer = timer(1000, 1000);

    // const sub = gameTimer.subscribe(t => {
    //   this.game.next();
    //   this.drawBoard();
    // });
  }

  ngOnInit() {
    let final = new GameOfLifeSVG(GameOfLifePattern.spaceship(), '#game-of-life-svg', this.element.nativeElement);
    let block = new GameOfLifeSVG(GameOfLifePattern.block(), '#game-of-life-block', this.element.nativeElement);
    let beehive = new GameOfLifeSVG(GameOfLifePattern.beehive(), '#game-of-life-beehive', this.element.nativeElement);
    let loaf = new GameOfLifeSVG(GameOfLifePattern.loaf(), '#game-of-life-loaf', this.element.nativeElement);
    let boat = new GameOfLifeSVG(GameOfLifePattern.boat(), '#game-of-life-boat', this.element.nativeElement);
    let tub = new GameOfLifeSVG(GameOfLifePattern.tub(), '#game-of-life-tub', this.element.nativeElement);

    let toad = new GameOfLifeSVG(GameOfLifePattern.toad(), '#game-of-life-toad', this.element.nativeElement);
    // toad.start();
    let beacon = new GameOfLifeSVG(GameOfLifePattern.beacon(), '#game-of-life-beacon', this.element.nativeElement);
    let glider = new GameOfLifeSVG(GameOfLifePattern.glider(), '#game-of-life-glider', this.element.nativeElement);

    // this.grid = d3.select(this.element.nativeElement).select('#game-of-life-svg')
    //   .append('svg')
    //   .attr('width', this.width + 'px')
    //   .attr('height', this.height + 'px');

    // const h = this.elHeight;
    // const w = this.elWidth;

    // this.row = this.grid.selectAll('.game-row')
    //   .data(this.game.board)
    //   .enter().append('g')
    //   .attr('class', 'game-row')
    //   .attr('transform', function (d, i) { return 'translate(0 ' + i * h + ')'; });

    // const column = this.row.selectAll('.square')
    //   .data(function (d) { return d; })
    //   .enter().append('rect')
    //   .attr('class', 'square')
    //   .attr('x', function (d, i) { return i * w; })
    //   // .attr("y", function (d, i) { return 0; })
    //   .attr('width', function (d, i) { return w; })
    //   .attr('height', function (d, i) { return h; })
    //   .style('fill', function (d): string { return d === 0 ? '#fff' : '#000'; })
    //   .style('stroke', '#222');

    // this.drawBoard();
  }

  // drawBoard() {
  //   const h = this.elHeight;
  //   const w = this.elWidth;

  //   this.row = this.grid.selectAll('.game-row')
  //     .data(this.game.board);

  //   const column = this.row.selectAll('.square')
  //     .data(function (d) { return d; })
  //     .transition()
  //     .duration(1000)
  //     .style('fill', function (d): string {
  //       return d === 0 ? '#fff' : '#000';
  //     });
  // }
}
