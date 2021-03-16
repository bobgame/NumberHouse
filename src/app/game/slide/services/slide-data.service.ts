import { Injectable } from '@angular/core'
import { SlideShowData, SlideData, SlideItem } from '../data/slide-type'
import { SLIDE_SHOW_DATA } from '../data/slide-data'
import { SLIDE_SAVE } from '../enum/slide-save.enum'
import { objCopy } from 'src/units/ObjCopy'
import { CelShowTime } from 'src/units/get-time'
import { StorageService } from 'src/app/common/services/storage.service'
import { AllService } from 'src/app/common/services/all.service'
import { SlidePageEnum } from '../enum/slide-page.enum'
import { randInArr } from 'src/units/base'

@Injectable({
  providedIn: 'root'
})
export class SlideDataService {

  slideShowData: SlideShowData = objCopy(SLIDE_SHOW_DATA)

  starArr = [1, 2]
  STAR_MAX = this.starArr.length
  slideShowTimeInterval: any
  slideData: SlideData = {
    continue: false,
    star: 0,
    lv: 1,
    nextId: 1,
    slideTimes: 0,
    time: 0,
    items: [],
    nowMode: 0,
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
    // const nowAllStar = this.slideData.allStars.find(a => a.mode === this.slideData.nowMode)
    // nowAllStar.starNum += addStar
    // nowAllStar.totalTime += this.slideData.time
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

  initSlideItems() {
    this.slideData.items = []
    for (let x = 1; x <= 12; x++) {
      for (let y = 1; y <= 12; y++) {
        const nowNumbers = [1, 2, 3, 4]
        const num = randInArr(nowNumbers)
        const thisItem: SlideItem = {
          id: this.slideData.nextId,
          number: num,
          name: num.toString(),
          isInContent: this.isInContent({ x, y }),
          pos: { x, y },
        }
        this.slideData.items.push(thisItem)
        this.slideData.nextId++

      }
    }
  }

  isInContent(pos: { x: number, y: number }) {
    const { x, y } = pos
    if (x >= 5 && x <= 8 && y >= 5 && y <= 8) {
      return true
    }
    return false
  }


  // 存档
  saveData(): void {
    this.storage.save(SLIDE_SAVE.NORMAL_STORAGE, this.slideData)
  }

  loadData() {
    const loadData: any = this.storage.load(SLIDE_SAVE.NORMAL_STORAGE)
    if (loadData) {
      this.slideData = loadData
    }
  }
}
