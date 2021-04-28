import { Component, OnInit } from '@angular/core'
import { GuessDataService } from '../../../services/guess-data.service'
import { GuessShowData } from '../../../data/guess-type'
import { GuessPageEnum } from '../../../enum/guess-page.enum'

@Component({
  selector: 'nw-guess-pop-gameover',
  templateUrl: './guess-pop-gameover.component.html',
  styleUrls: ['./guess-pop-gameover.component.scss'],
})
export class GuessPopGameoverComponent implements OnInit {

  guessShowData: GuessShowData

  constructor(
    private d: GuessDataService,
  ) {
    this.guessShowData = this.d.guessShowData
  }

  ngOnInit() { }

  hidePop() {
    this.d.guessShowData.pop.gameover = false
  }

  newGame() {
    this.d.resetResult()
    this.d.resetValue(this.d.guessData.len)
    this.d.createNumber(this.d.guessData.len, this.d.guessData.allNumbers)
    this.d.guessData.continue = true
    this.d.saveData()
    this.hidePop()
  }
  menu() {
    this.d.guessShowData.page = GuessPageEnum.Home
    this.hidePop()
  }

}
