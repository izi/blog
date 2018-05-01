import { Component, OnInit, ElementRef } from '@angular/core';
import { GameOfLife, GameOfLifePattern } from './game-of-life';
import { GameOfLifeSVG } from './game-of-life-svg';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit {
  game: GameOfLifeSVG;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const gameComponent = this.element.nativeElement;
    const block = new GameOfLifeSVG(GameOfLifePattern.block(), '#game-of-life-block', gameComponent, 210);
    const beehive = new GameOfLifeSVG(GameOfLifePattern.beehive(), '#game-of-life-beehive', gameComponent, 210);
    const loaf = new GameOfLifeSVG(GameOfLifePattern.loaf(), '#game-of-life-loaf', gameComponent, 210);
    const boat = new GameOfLifeSVG(GameOfLifePattern.boat(), '#game-of-life-boat', gameComponent, 210);
    const tub = new GameOfLifeSVG(GameOfLifePattern.tub(), '#game-of-life-tub', gameComponent, 210);

    const toad = new GameOfLifeSVG(GameOfLifePattern.toad(), '#game-of-life-toad', gameComponent, 210);
    toad.start();
    const beacon = new GameOfLifeSVG(GameOfLifePattern.beacon(), '#game-of-life-beacon', gameComponent, 210);
    beacon.start();
    const blinker = new GameOfLifeSVG(GameOfLifePattern.blinker(), '#game-of-life-blinker', gameComponent, 210);
    blinker.start();

    const glider = new GameOfLifeSVG(GameOfLifePattern.glider(), '#game-of-life-glider', gameComponent, 210);
    glider.start();
    const spaceship = new GameOfLifeSVG(GameOfLifePattern.spaceship(), '#game-of-life-spaceship', gameComponent, 210);
    spaceship.start();

    const gosperGliderGun = new GameOfLifeSVG(GameOfLifePattern.gosperGliderGun(), '#game-of-life-gospergun', gameComponent, 630);
    gosperGliderGun.start(1000, 50);

    this.game = new GameOfLifeSVG(GameOfLifePattern.empty(50), '#game-of-life-final', gameComponent, 630);
  }

  startGame() {
    this.game.start();
  }

  pauseGame() {
    this.game.stop();
  }

  stopGame() {
    this.game.clear();
    this.game.stop();
  }
}
