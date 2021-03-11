import { Component, OnInit } from '@angular/core'
import { GUESS_PAGE } from 'src/app/game/guess/enum/guess-page.enum'
import { GuessShowData, GuessData } from '../../../data/guess-type'
import { GuessDataService } from '../../../services/guess-data.service'
import { HardAndStar } from 'src/app/game/sudoku/data/sudoku-type'

@Component({
  selector: 'nw-guess-pop-pause',
  templateUrl: './guess-pop-pause.component.html',
  styleUrls: ['./guess-pop-pause.component.scss'],
})
export class GuessPopPauseComponent implements OnInit {

  GUESS_PAGE = GUESS_PAGE
  guessShowData: GuessShowData
  guessData: GuessData
  hardStar: HardAndStar

  constructor(
    private d: GuessDataService,
  ) {
  }

  ngOnInit() {
    this.guessShowData = this.d.guessShowData
    this.guessData = this.d.guessData
    this.init()
  }

  init() {
    const thisStar = this.guessData.allStars[0]
    this.hardStar = {
      modeName: 'Classics',
      starNum: thisStar.starNum,
      totalTime: this.d.celTime(thisStar.totalTime),
    }
  }

  hidePop() {
    this.d.guessShowData.pop.pause = false
    this.d.startShowTime()
  }

  gotoMenu() {
    this.d.guessShowData.page = GUESS_PAGE.Home
    this.d.guessShowData.pop.pause = false
  }
}
