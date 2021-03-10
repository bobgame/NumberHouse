import { Component, OnInit } from '@angular/core'
import { GuessDataService } from '../../../services/guess-data.service'
import { Router } from '@angular/router'
import { GUESS_PAGE } from '../../../enum/guess-page.enum'
import { GuessData } from '../../../data/guess-type'

@Component({
  selector: 'nw-guess-home',
  templateUrl: './guess-home.component.html',
  styleUrls: ['./guess-home.component.scss'],
})
export class GuessHomeComponent implements OnInit {

  GUESS_PAGE = GUESS_PAGE
  guessData: GuessData

  constructor(
    private d: GuessDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.gotoPage('PLAY') // for test
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
