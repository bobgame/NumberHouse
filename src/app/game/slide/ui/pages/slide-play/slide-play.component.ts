import { Component, OnInit, OnDestroy } from '@angular/core'
import { SlideDataService } from '../../../services/slide-data.service'
import { SlideData, SlideShowData } from '../../../data/slide-type'

@Component({
  selector: 'nw-slide-play',
  templateUrl: './slide-play.component.html',
  styleUrls: ['./slide-play.component.scss'],
})
export class SlidePlayComponent implements OnInit, OnDestroy {

  slideData: SlideData
  slideShowData: SlideShowData
  starArr: Array<number> = []

  constructor(
    public d: SlideDataService,
  ) { }

  ngOnInit() {
    this.slideData = this.d.slideData
    this.starArr = this.d.starArr
    this.slideShowData = this.d.slideShowData
    this.d.slideData.continue = true
    this.d.startShowTime()
  }

  ngOnDestroy() {
    this.d.pauseShowTime()
  }

  clickPlayOrPauseBtn() {
    this.d.pauseShowTime()
    this.d.slideShowData.pop.pause = true
  }

  startShowTime() {
    this.d.startShowTime()
  }

  pauseShowTime() {
    this.d.pauseShowTime()
  }

  clickNumber(number: string) {
    const emptyIndex = this.d.slideData.value.indexOf('-')
    const isHave = this.d.slideData.value.includes(number)
    if (emptyIndex > -1 && !isHave) {
      this.d.slideData.value[emptyIndex] = number
    }
  }

  delNumber() {
    const emptyIndex = this.d.slideData.value.indexOf('-')
    const len = this.d.slideData.len
    if (emptyIndex > 0) {
      this.d.slideData.value[emptyIndex - 1] = '-'
    } else {
      this.d.slideData.value[len - 1] = '-'
    }
  }

  submitNumber() {
    const emptyIndex = this.d.slideData.value.includes('-')
    if (!emptyIndex) {
      const len = this.d.slideData.len
      let aNum = 0
      let bNum = 0
      for (let i = 0; i < len; i++) {
        if (this.d.slideData.value[i] === this.d.slideData.number[i]) {
          aNum++
        } else if (this.d.slideData.number.includes(this.d.slideData.value[i])) {
          bNum++
        }
      }
      const result = `
        <div class="result-value">${this.d.slideData.value.join('')}</div>
        <div class="result-result"><span>${aNum}A</span>${bNum}B</div>
      `
      this.d.slideData.results.push(result)
      this.d.slideData.slideTimes++
      this.d.resetValue(len)
      if (aNum >= len) {
        this.d.gameWin()
      } else if (this.d.slideData.slideTimes >= this.d.slideData.slideMaxTimes) {
        this.d.gameFail()
      } else if (this.d.slideData.slideTimes >= Math.floor(this.d.slideData.slideMaxTimes * 0.75)) {
        this.d.slideData.star--
      }
      this.d.saveData()
    }
  }

}
