import { Component, OnInit, OnDestroy } from '@angular/core'
import { GuessDataService } from '../../../services/guess-data.service'
import { GuessData, GuessShowData } from '../../../data/guess-type'

@Component({
  selector: 'nw-guess-play',
  templateUrl: './guess-play.component.html',
  styleUrls: ['./guess-play.component.scss'],
})
export class GuessPlayComponent implements OnInit, OnDestroy {

  guessData: GuessData
  guessShowData: GuessShowData
  starArr: Array<number> = []

  constructor(
    public d: GuessDataService,
  ) { }

  ngOnInit() {
    this.guessData = this.d.guessData
    this.starArr = this.d.starArr
    this.guessShowData = this.d.guessShowData
    this.d.guessData.continue = true
    this.d.startShowTime()
  }

  ngOnDestroy() {
    this.d.pauseShowTime()
  }

  clickPlayOrPauseBtn() {
    this.d.pauseShowTime()
    this.d.guessShowData.pop.pause = true
  }

  startShowTime() {
    this.d.startShowTime()
  }

  pauseShowTime() {
    this.d.pauseShowTime()
  }

  clickNumber(number: string) {
    const emptyIndex = this.d.guessData.value.indexOf('-')
    const isHave = this.d.guessData.value.includes(number)
    if (emptyIndex > -1 && !isHave) {
      this.d.guessData.value[emptyIndex] = number
    }
  }

  delNumber() {
    const emptyIndex = this.d.guessData.value.indexOf('-')
    const len = this.d.guessData.len
    if (emptyIndex > 0) {
      this.d.guessData.value[emptyIndex - 1] = '-'
    } else {
      this.d.guessData.value[len - 1] = '-'
    }
  }

  submitNumber() {
    const emptyIndex = this.d.guessData.value.includes('-')
    if (!emptyIndex) {
      const len = this.d.guessData.len
      let aNum = 0
      let bNum = 0
      for (let i = 0; i < len; i++) {
        if (this.d.guessData.value[i] === this.d.guessData.number[i]) {
          aNum++
        } else if (this.d.guessData.number.includes(this.d.guessData.value[i])) {
          bNum++
        }
      }
      const result = `
        <div class="result-value">${this.d.guessData.value.join('')}</div>
        <div class="result-result"><span>${aNum}A</span>${bNum}B</div>
      `
      this.d.guessData.results.push(result)
      this.d.guessData.guessTimes++
      this.d.resetValue(len)
      if (aNum >= len) {
        this.d.gameWin()
      } else if (this.d.guessData.guessTimes >= this.d.guessData.guessMaxTimes) {
        this.d.gameFail()
      } else if (this.d.guessData.guessTimes >= Math.floor(this.d.guessData.guessMaxTimes * 0.75)) {
        this.d.guessData.star--
      }
      this.d.saveData()
    }
  }

}
