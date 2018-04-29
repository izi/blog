import { GameOfLife } from "./game-of-life";
import * as d3 from 'd3';

export class GameOfLifeSVG {
    width = 256 - 80;
    height = 256 - 80;
    unit = 'px';

    constructor(private game: GameOfLife, selector: string, element: any) {
        var grid = d3.select(element).select(selector)
            .append('svg')
            .attr('width', this.width + this.unit)
            .attr('height', this.height + this.unit);

        const h = this.height / this.game.height;
        const w = this.width / this.game.width;

        var row = grid.selectAll('.game-row')
            .data(this.game.board)
            .enter().append('g')
            .attr('class', 'game-row')
            .attr('transform', function (d, i) { return 'translate(0 ' + i * h + ')'; });

        const column = row.selectAll('.square')
            .data(function (d) { return d; })
            .enter().append('rect')
            .attr('class', 'square')
            .attr('x', function (d, i) { return i * w; })
            // .attr("y", function (d, i) { return 0; })
            .attr('width', function (d, i) { return w; })
            .attr('height', function (d, i) { return h; })
            .style('fill', function (d): string { return d === 0 ? '#fff' : '#000'; })
            .style('stroke', '#222');
    }

    start(): any {
        throw new Error("Method not implemented.");
    }
}