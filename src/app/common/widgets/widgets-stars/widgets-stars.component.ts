import { Component, Input, OnInit } from '@angular/core';
import { SudokuDataService } from 'src/app/game/sudoku/services/sudoku-data.service';
import { GameId } from '../../enum/game.enum';
import { AllService } from '../../services/all.service';

@Component({
  selector: 'nw-widgets-stars',
  templateUrl: './widgets-stars.component.html',
  styleUrls: ['./widgets-stars.component.scss'],
})
export class WidgetsStarsComponent implements OnInit {

  @Input() showAllGameStars = false
  @Input() games: GameId[] = []

  canUseStar = 0
  allStar = 0

  slideStarData = {
    isShow: false,
    getStar: 0,
  }

  sudokuStarData = {
    isShow: false,
    getStar: 0,
    allStars: [
      {
        mode: 0,
        name: '',
        starNum: 0,
      },
      {
        mode: 1,
        name: '',
        starNum: 0,
      },
      {
        mode: 2,
        name: '',
        starNum: 0,
      }
    ]
  }

  guessStarData = {
    isShow: false,
    getStar: 0,
  }

  constructor(
    private all: AllService,
    private sudokuDataService: SudokuDataService,
  ) { }

  ngOnInit() {
    this.init()
  }

  init() {
    this.canUseStar = this.all.allData.star
    this.allStar = this.all.allData.allGetStar
    if (this.showAllGameStars) {
      this.all.allData.gameStars.forEach(game => {
        this.initGame(game.id)
      })
    } else {
      this.games.forEach(gameId => {
        this.initGame(gameId)
      })
    }
  }

  initGame(gameId: GameId) {
    switch (gameId) {
      case GameId.slide:
        this.initStarsForSlide()
        break;
      case GameId.sudoku:
        this.initStarsForSudoku()
        break;
      case GameId.guess:
        this.initStarsForGuess()
        break;

      default:
        break;
    }
  }

  initStarsForSlide() {
    const getStar = this.all.allData.gameStars.find(a => a.id === GameId.slide)?.getStar || 0
    this.slideStarData.getStar = getStar
    this.slideStarData.isShow = true
  }

  initStarsForSudoku() {
    const getStar = this.all.allData.gameStars.find(a => a.id === GameId.sudoku)?.getStar || 0
    this.sudokuStarData.getStar = getStar
    this.sudokuStarData.isShow = true
    const allStars = this.sudokuDataService.sudokuData.allStars
    this.sudokuStarData.allStars.forEach((modeItem) => {
      modeItem.starNum = allStars.find(a => a.mode === modeItem.mode)?.starNum || 0
      modeItem.name = this.sudokuDataService.hardModeName[modeItem.mode]
    })
  }

  initStarsForGuess() {
    const getStar = this.all.allData.gameStars.find(a => a.id === GameId.guess)?.getStar || 0
    this.guessStarData.getStar = getStar
    this.guessStarData.isShow = true
  }

}
