import { Component, OnInit } from '@angular/core'
import { GuessPageEnum } from 'src/app/game/guess/enum/guess-page.enum'
import { GuessShowData, GuessData } from '../../../data/guess-type'
import { GuessDataService } from '../../../services/guess-data.service'
import { HardAndStar } from 'src/app/game/sudoku/data/sudoku-type'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'nw-guess-pop-pause',
  templateUrl: './guess-pop-pause.component.html',
  styleUrls: ['./guess-pop-pause.component.scss'],
})
export class GuessPopPauseComponent implements OnInit {

  GuessPageEnum = GuessPageEnum
  guessShowData: GuessShowData
  guessData: GuessData
  hardStar: HardAndStar

  constructor(
    private d: GuessDataService,
    private translate: TranslateService,
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
      modeName: this.translate.instant('common.normal'),
      lvText: '',
      starNum: thisStar.starNum,
      totalTime: this.d.celTime(thisStar.totalTime),
    }
  }

  hidePop() {
    this.d.guessShowData.pop.pause = false
    this.d.startShowTime()
  }

  gotoMenu() {
    this.d.guessShowData.page = GuessPageEnum.Home
    this.d.guessShowData.pop.pause = false
  }
}
