import { GameOfLife, GameOfLifePattern, Life } from './game-of-life';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
import * as d3 from 'd3';
import { DSV } from 'd3';

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
        const h = this.size / this.game.height;
        const w = this.size / this.game.width;

        this.grid = d3.select(element).select(selector)
            .append('svg')
            .attr('width', this.size + this.unit)
            .attr('height', this.size + this.unit)
            .on('click', this.selectCell(h, w))
            .on('mouseover', this.selectCell(h, w, false));

        const row = this.grid.selectAll('.game-row')
            .data(this.game.board)
            .enter()
            .append('g')
            .attr('class', 'game-row')
            .attr('transform', function (d, i) { return 'translate(0 ' + i * h + ')'; });
        row.selectAll('.square')
            .data(function (d) { return d; })
            .enter().append('rect')
            .attr('class', 'square')
            .attr('x', function (d, i, j) { return i * w; })
            .attr('width', function (d, i, j) { return w; })
            .attr('height', function (d, i) { return h; })
            .style('fill', function (d): string { return d === Life.Dead ? '#fff' : '#000'; })
            .style('stroke', '#222');
    }

    start(initialDelay = 1000, delay = 1000) {
        const gameTimer = timer(initialDelay, delay);

        this.subscription = gameTimer.subscribe(t => {
            this.game.next();
            this.drawBoard(delay);
        });
    }

    stop() {
        this.subscription.unsubscribe();
    }

    clear() {
        this.game.clear();
        this.drawBoard(0);
    }

    private drawBoard(duration: number) {
        const h = this.size / this.game.height;
        const w = this.size / this.game.width;

        const row = this.grid.selectAll('.game-row')
            .data(this.game.board);

        row.selectAll('.square')
            .data(function (d) { return d; })
            .style('fill', function (d): string {
                return d === Life.Dead ? '#fff' : '#000';
            });
    }

    private selectCell(h: number, w: number, allButtons = true): (d) => void {
        return (d) => {
            d3.event.stopPropagation();
            const coords = d3.mouse(d3.event.currentTarget);

            console.log(d3.event.buttons);
            if (allButtons || d3.event.buttons === 1) {
                const col = Math.floor(coords[0] / h);
                const row = Math.floor(coords[1] / w);

                this.game.board[row][col] = this.game.board[row][col] === Life.Alive ? Life.Dead : Life.Alive;
                this.drawBoard(1000);
            }
        };
    }
}
