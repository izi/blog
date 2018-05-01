import { GameOfLife, GameOfLifePattern } from './game-of-life';

describe('GameOfLife', () => {
    it('should not change if contains only still block', () => {
        const game = GameOfLifePattern.block();
        const gameExpected = GameOfLifePattern.block();

        game.next();
        expect(game).toEqual(gameExpected);
    });

    it('should change if contains blinker oscilator with period 2', () => {
        const game = GameOfLifePattern.blinker();
        const gameExpected = GameOfLifePattern.blinker();

        game.next();
        expect(game).not.toEqual(gameExpected);
    });

    it('should look the same after 2 iterations for blinker oscilator with period 2', () => {
        const game = GameOfLifePattern.blinker();
        const gameExpected = GameOfLifePattern.blinker();

        game.next();
        game.next();
        expect(game).toEqual(gameExpected);
    });
});
