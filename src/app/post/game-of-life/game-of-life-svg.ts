import { GameOfLife } from "./game-of-life";
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import { timer } from 'rxjs/observable/timer';
import * as d3 from 'd3';

export class GameOfLifeSVG {
    subscription: Subscription;
    grid: d3.Selection<d3.BaseType, {}, null, undefined>;
    size;
    unit = 'px';

    constructor(private game: GameOfLife, selector: string, element: any, size: number) {
        this.size = size;
        this.drawInitialBoard(element, selector);
    }

    private drawInitialBoard(element: any, selector: string) {
        this.grid = d3.select(element).select(selector)
            .append('svg')
            .attr('width', this.size + this.unit)
            .attr('height', this.size + this.unit);
        const h = this.size / this.game.height;
        const w = this.size / this.game.width;
        var row = this.grid.selectAll('.game-row')
            .data(this.game.board)
            .enter().append('g')
            .attr('class', 'game-row')
            .attr('transform', function (d, i) { return 'translate(0 ' + i * h + ')'; });
        row.selectAll('.square')
            .data(function (d) { return d; })
            .enter().append('rect')
            .attr('class', 'square')
            .attr('x', function (d, i, j) { return i * w; })
            // .attr('y', function (d, i, j) { return j * h; })
            .attr('width', function (d, i, j) { return w; })
            .attr('height', function (d, i) { return h; })
            .style('fill', function (d): string { return d === 0 ? '#fff' : '#000'; })
            .style('stroke', '#222')
            .on('click', function (d, i, j) {
                console.log(d, i);
            });
    }

    start(initialDelay = 1000, delay = 1000) {
        let gameTimer = timer(initialDelay, delay);

        this.subscription = gameTimer.subscribe(t => {
            this.game.next();
            this.drawBoard(delay);
        });
    }

    stop() {
        this.subscription.unsubscribe();
    }

    private drawBoard(duration: number) {
        const h = this.size / this.game.height;
        const w = this.size / this.game.width;

        var row = this.grid.selectAll('.game-row')
            .data(this.game.board);

        row.selectAll('.square')
            .data(function (d) { return d; })
            .transition()
            .duration(duration)
            .style('fill', function (d): string {
                return d === 0 ? '#fff' : '#000';
            });
    }
}