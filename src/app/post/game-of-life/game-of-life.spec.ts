import { GameOfLife, GameOfLifePattern } from "./game-of-life";

describe('GameOfLife', () => {
    // beforeEach(async(() => {
    //   TestBed.configureTestingModule({
    //     declarations: [ GameOfLifeComponent ]
    //   })
    //   .compileComponents();
    // }));

    // beforeEach(() => {
    //   fixture = TestBed.createComponent(GameOfLifeComponent);
    //   component = fixture.componentInstance;
    //   fixture.detectChanges();
    // });

    it('should not change if contains only still block', () => {
        let game = GameOfLifePattern.block();
        let gameExpected = GameOfLifePattern.block();

        game.next();
        expect(game).toEqual(gameExpected);
    });

    it('should change if contains blinker oscilator with period 2', () => {
        let game = GameOfLifePattern.blinker();
        let gameExpected = GameOfLifePattern.blinker();

        game.next();
        expect(game).not.toEqual(gameExpected);
    });

    it('should look the same after 2 iterations for blinker oscilator with period 2', () => {
        let game = GameOfLifePattern.blinker();
        let gameExpected = GameOfLifePattern.blinker();

        game.next();
        game.next();
        expect(game).toEqual(gameExpected);
    });
});