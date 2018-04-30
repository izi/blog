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
    let block = new GameOfLifeSVG(GameOfLifePattern.block(), '#game-of-life-block', this.element.nativeElement, 210);
    let beehive = new GameOfLifeSVG(GameOfLifePattern.beehive(), '#game-of-life-beehive', this.element.nativeElement, 210);
    let loaf = new GameOfLifeSVG(GameOfLifePattern.loaf(), '#game-of-life-loaf', this.element.nativeElement, 210);
    let boat = new GameOfLifeSVG(GameOfLifePattern.boat(), '#game-of-life-boat', this.element.nativeElement, 210);
    let tub = new GameOfLifeSVG(GameOfLifePattern.tub(), '#game-of-life-tub', this.element.nativeElement, 210);

    let toad = new GameOfLifeSVG(GameOfLifePattern.toad(), '#game-of-life-toad', this.element.nativeElement, 210);
    toad.start();
    let beacon = new GameOfLifeSVG(GameOfLifePattern.beacon(), '#game-of-life-beacon', this.element.nativeElement, 210);
    beacon.start();
    let blinker = new GameOfLifeSVG(GameOfLifePattern.blinker(), '#game-of-life-blinker', this.element.nativeElement, 210);
    blinker.start();
    
    let glider = new GameOfLifeSVG(GameOfLifePattern.glider(), '#game-of-life-glider', this.element.nativeElement, 210);
    glider.start();
    let spaceship = new GameOfLifeSVG(GameOfLifePattern.spaceship(), '#game-of-life-spaceship', this.element.nativeElement, 210);
    spaceship.start();

    let gosperGliderGun = new GameOfLifeSVG(GameOfLifePattern.gosperGliderGun(), '#game-of-life-gospergun', this.element.nativeElement, 630);
    gosperGliderGun.start(1000, 150);

    this.game = new GameOfLifeSVG(GameOfLifePattern.empty(80), '#game-of-life-final', this.element.nativeElement, 630);
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
