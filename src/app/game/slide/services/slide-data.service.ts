import { Injectable } from '@angular/core'
import { SlideShowData, SlideData } from '../data/slide-type'
import { GUESS_SHOW_DATA } from '../data/slide-data'
import { GUESS_SAVE } from '../enum/slide-save.enum'
import { objCopy } from 'src/units/ObjCopy'
import { CelShowTime } from 'src/units/get-time'
import { StorageService } from 'src/app/common/services/storage.service'
import { AllService } from 'src/app/common/services/all.service'
import { SlidePageEnum } from '../enum/slide-page.enum'

@Injectable({
  providedIn: 'root'
})
export class SlideDataService {

  slideShowData: SlideShowData = objCopy(GUESS_SHOW_DATA)

  starArr = [1, 2]
  STAR_MAX = this.starArr.length
  slideShowTimeInterval: any
  slideData: SlideData = {
    continue: false,
    len: 4,
    star: 2,
    time: 0,
    slideTimes: 0,
    slideMaxTimes: 8,
    allNumbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    useTime: 0,
    value: [],
    number: [],
    results: [],
    marks: [],
    nowMode: 0,
    allStars: [
      {
        mode: 0,
        starNum: 0,
        totalTime: 0,
      },
      {
        mode: 1,
        starNum: 0,
        totalTime: 0,
      },
      {
        mode: 2,
        starNum: 0,
        totalTime: 0,
      }
    ]
  }

  constructor(
    private storage: StorageService,
    private all: AllService,
  ) { }

  startShowTime() {
    // console.log('Start Show Time: ' + this.slideShowData.showTime)
    clearInterval(this.slideShowTimeInterval)
    this.slideShowData.showTime = this.celTime(this.slideData.time)
    this.slideShowTimeInterval = setInterval(() => {
      this.slideData.time++
      this.slideShowData.showTime = this.celTime(this.slideData.time)
      this.slideShowData.pauseTime = false
      this.saveData()
    }, 1000)
  }

  gotoSlideHome() {
    this.slideShowData.page = SlidePageEnum.Home
  }

  celTime(time: number): string {
    return CelShowTime(time)
  }

  pauseShowTime() {
    // console.log('Pause Show Time: ' + this.slideShowData.showTime)
    this.slideShowData.pauseTime = true
    clearInterval(this.slideShowTimeInterval)
  }

  gameWin() {
    this.pauseShowTime()
    const addStar = this.slideData.star
    this.slideShowData.gameOverText = `
    <p class="mb-2">Win! Win!</p>
    <p class="d-flex align-items-center justify-content-center">Got<span class="color-red pl-1"> <i class="nwicon nwi-star-full color-red"></i> x ${addStar}</span></p>
    `
    const nowAllStar = this.slideData.allStars.find(a => a.mode === this.slideData.nowMode)
    nowAllStar.starNum += addStar
    nowAllStar.totalTime += this.slideData.time
    this.all.starData.star += addStar
    this.all.save()
    this.saveData()
    this.slideShowData.pop.gameover = true
    this.slideData.continue = false
  }
  gameFail() {
    this.pauseShowTime()
    this.slideShowData.gameOverText = `<div>Game Over!</div>`
    this.slideShowData.pop.gameover = true
    this.slideData.continue = false
  }

  createNumber(len: number, allNums: string[]) {
    this.slideData.time = 0
    this.slideData.star = this.STAR_MAX
    const tempNums = []
    for (let i = 0; i < 99999; i++) {
      const num = allNums[Math.floor(Math.random() * allNums.length)].toString()
      if (!tempNums.includes(num)) {
        tempNums.push(num)
        if (tempNums.length >= len) { break }
      }
    }
    console.log(tempNums)
    this.slideData.number = tempNums
    this.startShowTime()
  }

  resetValue(len: number) {
    this.slideData.value = []
    for (let j = 0; j < len; j++) {
      this.slideData.value.push('-')
    }
  }

  resetResult() {
    this.slideData.slideTimes = 0
    this.slideData.results = []
  }

  // 存档
  saveData(): void {
    this.storage.save(GUESS_SAVE.NORMAL_STORAGE, this.slideData)
  }

  loadData() {
    const loadData: any = this.storage.load(GUESS_SAVE.NORMAL_STORAGE)
    if (loadData) {
      this.slideData = loadData
    }
  }
}
