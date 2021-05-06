import { Injectable } from '@angular/core'
import { GuessShowData, GuessData } from '../data/guess-type'
import { GUESS_SHOW_DATA } from '../data/guess-data'
import { GUESS_SAVE } from '../enum/guess-save.enum'
import { objCopy } from 'src/units/ObjCopy'
import { CelShowTime } from 'src/units/get-time'
import { StorageService } from 'src/app/common/services/storage.service'
import { AllService } from 'src/app/common/services/all.service'
import { GuessPageEnum } from '../enum/guess-page.enum'
import { GameId } from 'src/app/common/enum/game.enum'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class GuessDataService {

  guessShowData: GuessShowData = objCopy(GUESS_SHOW_DATA)

  starArr = [1, 2]
  STAR_MAX = this.starArr.length
  guessShowTimeInterval: any
  guessData: GuessData = {
    continue: false,
    len: 4,
    star: 2,
    time: 0,
    guessTimes: 0,
    guessMaxTimes: 8,
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
    private translate: TranslateService,
  ) { }

  startShowTime() {
    // console.log('Start Show Time: ' + this.guessShowData.showTime)
    clearInterval(this.guessShowTimeInterval)
    this.guessShowData.showTime = this.celTime(this.guessData.time)
    this.guessShowTimeInterval = setInterval(() => {
      this.guessData.time++
      this.guessShowData.showTime = this.celTime(this.guessData.time)
      this.guessShowData.pauseTime = false
      this.saveData()
    }, 1000)
  }

  gotoGuessHome() {
    this.guessShowData.page = GuessPageEnum.Home
  }

  celTime(time: number): string {
    return CelShowTime(time)
  }

  pauseShowTime() {
    // console.log('Pause Show Time: ' + this.guessShowData.showTime)
    this.guessShowData.pauseTime = true
    clearInterval(this.guessShowTimeInterval)
  }

  gameWin() {
    this.pauseShowTime()
    const addStar = this.guessData.star
    this.guessShowData.gameOverText = `
    <p class="mb-2">${this.translate.instant('gameOver.winWin')}</p>
    <p class="d-flex align-items-center justify-content-center">${this.translate.instant('gameOver.timesOver')}<span class="color-red pl-1"> <i class="nwicon nwi-star-full color-red"></i> x ${addStar}</span></p>
    `
    const nowAllStar = this.guessData.allStars.find(a => a.mode === this.guessData.nowMode)
    nowAllStar.starNum += addStar
    nowAllStar.totalTime += this.guessData.time
    this.all.allData.star += addStar
    this.all.allData.allGetStar += addStar
    this.all.allData.allGetStar += addStar
    this.all.allData.gameStars.find(g => g.id === GameId.guess).getStar += addStar
    this.saveData()
    this.all.save()
    this.guessShowData.pop.gameover = true
    this.guessData.continue = false
  }
  gameFail() {
    this.pauseShowTime()
    this.guessShowData.gameOverText = `<div>${this.translate.instant('gameOver.gameOver')}</div>`
    this.guessShowData.pop.gameover = true
    this.guessData.continue = false
  }

  createNumber(len: number, allNums: string[]) {
    this.guessData.time = 0
    this.guessData.star = this.STAR_MAX
    const tempNums = []
    for (let i = 0; i < 99999; i++) {
      const num = allNums[Math.floor(Math.random() * allNums.length)].toString()
      if (!tempNums.includes(num)) {
        tempNums.push(num)
        if (tempNums.length >= len) { break }
      }
    }
    // console.log(tempNums)
    this.guessData.number = tempNums
    this.startShowTime()
  }

  resetValue(len: number) {
    this.guessData.value = []
    for (let j = 0; j < len; j++) {
      this.guessData.value.push('-')
    }
  }

  resetResult() {
    this.guessData.guessTimes = 0
    this.guessData.results = []
  }

  // 存档
  saveData(): void {
    this.storage.save(GUESS_SAVE.NORMAL_STORAGE, this.guessData)
  }

  loadData() {
    const loadData: any = this.storage.load(GUESS_SAVE.NORMAL_STORAGE)
    if (loadData) {
      this.guessData = loadData
    }
  }
}
