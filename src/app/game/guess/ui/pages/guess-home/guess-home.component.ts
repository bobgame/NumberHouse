import { Component, OnInit } from '@angular/core'
import { GuessDataService } from '../../../services/guess-data.service'
import { Router } from '@angular/router'
import { GuessPageEnum } from '../../../enum/guess-page.enum'
import { GuessData } from '../../../data/guess-type'
import { AllService } from 'src/app/common/services/all.service'
import { GameId } from 'src/app/common/enum/game.enum'

@Component({
  selector: 'nw-guess-home',
  templateUrl: './guess-home.component.html',
  styleUrls: ['./guess-home.component.scss'],
})
export class GuessHomeComponent implements OnInit {

  GuessPageEnum = GuessPageEnum
  guessData: GuessData
  menuColor = 0
  nowGameId = GameId.guess

  constructor(
    private d: GuessDataService,
    private router: Router,
    private all: AllService,
  ) { }

  ngOnInit() {
    this.menuColor = this.all.getMenuColor(this.nowGameId)
    // this.gotoPage('Play') // for test
    this.init()
  }

  init() {
    this.d.loadData()
    this.guessData = this.d.guessData
  }

  initGame() {
    this.d.resetResult()
    this.d.resetValue(this.d.guessData.len)
    this.d.createNumber(this.d.guessData.len, this.d.guessData.allNumbers)
  }

  gotoPage(pageName: string, isNewGame?: boolean) {
    if (isNewGame) {
      this.initGame()
    }
    this.d.guessShowData.page = pageName
  }

  backGameMenu() {
    this.router.navigate(['/home'])
  }

}
