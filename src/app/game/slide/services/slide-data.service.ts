import { Injectable } from '@angular/core'
import { SlideShowData, SlideData, SlideItem, SlidePos, SlideNumItem } from '../data/slide-type'
import { SlideDataDefault, SlideShowDataDefault } from '../data/slide-data'
import { SLIDE_SAVE } from '../enum/slide-save.enum'
import { objCopy } from 'src/units/ObjCopy'
import { CelShowTime } from 'src/units/get-time'
import { StorageService } from 'src/app/common/services/storage.service'
import { AllService } from 'src/app/common/services/all.service'
import { SlidePageEnum } from '../enum/slide-page.enum'
import { deepCopy, randInArr } from 'src/units/base'
import { DirectiveEnum } from 'src/app/common/enum/directive.enum'
import { GameId } from 'src/app/common/enum/game.enum'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class SlideDataService {

  slideShowData: SlideShowData = objCopy(SlideShowDataDefault)

  starArr = [1, 2]
  STAR_MAX = this.starArr.length
  slideShowTimeInterval: any
  slideData: SlideData = objCopy(SlideDataDefault)

  moveTimes = 16
  itemWidth = 160
  isSwiping = false
  needRMItemIds: number[] = []

  startPos = -4
  endPos = 9
  showStartPos = 1
  showEndPos = 4
  // startPos = 0
  // endPos = 13
  // showStartPos = 5
  // showEndPos = 8

  constructor(
    private storage: StorageService,
    private all: AllService,
    private translate: TranslateService,
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
    let addStar = this.slideData.lv - 2
    if (addStar < 0) { addStar = 0 }
    this.slideShowData.gameOverText = `
    <p class="mb-2">${this.translate.instant('gameOver.timesOver')}</p>
    <p class="d-flex align-items-center justify-content-center">${this.translate.instant('common.got')}<span class="color-red pl-1"> <i class="nwicon nwi-star-full color-red"></i> x ${addStar}</span></p>
    `
    this.all.allData.star += addStar
    this.all.allData.allGetStar += addStar
    this.all.allData.gameStars.find(g => g.id === GameId.slide).getStar += addStar
    this.all.save()
    this.saveData()
    this.slideShowData.pop.gameover = true
    this.slideData.continue = false
  }

  initSlideGame() {
    const tempSlideDataDefault = objCopy(SlideDataDefault)
    for (const i in tempSlideDataDefault) {
      if (this.slideData && this.slideData.lv) { this.slideData[i] = tempSlideDataDefault[i] }
      else { this.slideData = tempSlideDataDefault; break }
    }
    this.initPoses()
    this.initSlideItems()
  }

  initPoses() {
    this.slideData.inPoses = []
    for (let x = this.showStartPos; x <= this.showEndPos; x++) {
      for (let y = this.showStartPos; y <= this.showEndPos; y++) {
        this.slideData.inPoses.push({ x, y })
      }
    }
  }

  getLevelNumbers(lv: number) {
    const baseMaxNum = 4
    const lvNumArr: number[] = []
    for (let i = 1; i < lv + baseMaxNum; i++) {
      if (i <= 18) {
        lvNumArr.push(i)
      }
    }
    return lvNumArr
  }

  initSlideItems() {
    this.slideData.slideScore = 0
    this.slideData.items = []
    for (let x = this.startPos; x < this.endPos; x++) {
      for (let y = this.startPos; y < this.endPos; y++) {
        const nowNumbers = this.getLevelNumbers(this.slideData.lv)
        const num = randInArr(nowNumbers)
        const thisItem: SlideItem = {
          id: this.slideData.nextId,
          num,
          isInContent: this.isInContent({ x, y }),
          destroyNum: 0,
          pos: { x, y },
          posX: x * this.itemWidth,
          posY: y * this.itemWidth,
          goX: x * this.itemWidth,
          goY: y * this.itemWidth,
          goStep: 0,
        }
        this.slideData.items.push(thisItem)
        this.slideData.nextId++
      }
    }
  }

  isInContent(pos: SlidePos) {
    const { x, y } = pos
    if (x >= this.showStartPos && x <= this.showEndPos && y >= this.showStartPos && y <= this.showEndPos) {
      return true
    }
    return false
  }

  getItemByPos(pos: SlidePos): SlideItem {
    const { x, y } = pos
    return this.slideData.items.find(i => i.pos.x === x && i.pos.y === y)
  }
  getItemById(id: number): SlideItem {
    return this.slideData.items.find(i => i.id === id)
  }

  getNearInItems(pos: SlidePos) {
    const arr: SlideItem[] = []
    const posArr = [
      { x: pos.x - 1, y: pos.y },
      { x: pos.x + 1, y: pos.y },
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x, y: pos.y + 1 },
    ]
    posArr.forEach(p => {
      const inPos = this.slideData.inPoses.find(i => i.x === p.x && i.y === p.y)
      if (inPos) {
        const tempItem = this.getItemByPos(p)
        if (tempItem) {
          arr.push(tempItem)
        }
      }
    })
    return arr
  }

  checkSameItems() {
    this.slideData.slideTimes--
    this.slideData.items.forEach(item => {
      item.isInContent = this.isInContent(item.pos)
    })
    const sameItemIds: number[][] = []
    for (let x = this.showStartPos; x <= this.showEndPos; x++) {
      for (let y = this.showStartPos; y <= this.showEndPos; y++) {
        const p = { x, y }
        const thisItem = this.getItemByPos(p)
        if (thisItem) {
          const nearItems = this.getNearInItems(p)
          nearItems.forEach(nearItem => {
            if (thisItem.num === nearItem.num) {
              let inSame = false
              sameItemIds.forEach(s => {
                if (s.includes(nearItem.id) || s.includes(thisItem.id)) {
                  inSame = true
                  if (s.includes(nearItem.id) && !s.includes(thisItem.id)) {
                    s.push(thisItem.id)
                  } else if (!s.includes(nearItem.id) && s.includes(thisItem.id)) {
                    s.push(nearItem.id)
                  }
                }
              })
              if (!inSame) {
                sameItemIds.push([thisItem.id, nearItem.id])
              }
            }
          })
        }
      }
    }
    this.needRMItemIds = []
    // times and score
    let addTimes = 0
    sameItemIds.forEach(s => {
      if (s.length > 2) {
        this.needRMItemIds = this.needRMItemIds.concat(s)
      }
      if (s.length > 2) {
        addTimes += s.length - 2
        this.slideData.slideScore += s.length * s.length * 10
        // console.log(this.slideData.lv)
        const newLv = Math.floor(this.slideData.slideScore / (2000 + 1000 * this.slideData.lv - 1)) + 1
        if (this.slideData.lv < newLv) {
          this.slideData.lv = newLv
        }
      }
    })
    if (addTimes > 4) { addTimes = 3 }
    else if (addTimes > 2) { addTimes = 2 }
    this.slideData.slideTimes += addTimes
    this.needRMItemIds.sort((a, b) => b - a)
    // console.log(this.needRMItemIds)
    this.slideData.items.forEach(item => {
      if (this.needRMItemIds.includes(item.id) && item.isInContent) {
        item.isDestroying = true
      } else {
        item.isDestroying = false
      }
    })
  }

  removeAndCreateItems(directive: DirectiveEnum) {
    setTimeout(() => {
      let emptyPoses: SlidePos[] = []
      this.needRMItemIds.forEach(n => {
        const nIndex = this.slideData.items.findIndex(i => i.id === n)
        if (nIndex > -1) {
          emptyPoses.push(this.slideData.items[nIndex].pos)
          this.slideData.items.splice(nIndex, 1)
        }
      })
      switch (directive) {
        case DirectiveEnum.Left:
          emptyPoses = emptyPoses.sort((a, b) => a.x - b.x)
          this.fillEmptyPoses(emptyPoses, { x: 1, y: 0 })
          break
        case DirectiveEnum.Right:
          emptyPoses = emptyPoses.sort((a, b) => b.x - a.x)
          this.fillEmptyPoses(emptyPoses, { x: -1, y: 0 })
          break
        case DirectiveEnum.Up:
          emptyPoses = emptyPoses.sort((a, b) => a.y - b.y)
          this.fillEmptyPoses(emptyPoses, { x: 0, y: 1 })
          break
        case DirectiveEnum.Down:
          emptyPoses = emptyPoses.sort((a, b) => b.y - a.y)
          this.fillEmptyPoses(emptyPoses, { x: 0, y: -1 })
          break
        default:
          break
      }
      // Remove other no need items
      const otherNeedRmIds = []
      this.slideData.items.forEach(item => {
        if (item.pos.x > this.endPos || item.pos.y > this.endPos || item.pos.x < this.startPos || item.pos.y < this.startPos) {
          otherNeedRmIds.push(item.id)
        }
      })
      otherNeedRmIds.sort((a, b) => b - a)
      otherNeedRmIds.forEach(n => {
        const nIndex = this.slideData.items.findIndex(i => i.id === n)
        if (nIndex > -1) {
          this.slideData.items.splice(nIndex, 1)
        }
      })
      // create new items
      for (let x = this.startPos; x <= this.endPos; x++) {
        for (let y = this.startPos; y <= this.endPos; y++) {
          const nowNumbers = this.getLevelNumbers(this.slideData.lv)
          const num = randInArr(nowNumbers)
          const isInItem = this.slideData.items.find(i => i.pos.x === x && i.pos.y === y)
          if (!isInItem) {
            const thisItem: SlideItem = {
              id: this.slideData.nextId,
              num,
              isInContent: this.isInContent({ x, y }),
              destroyNum: 0,
              pos: { x, y },
              posX: x * this.itemWidth,
              posY: y * this.itemWidth,
              goX: x * this.itemWidth,
              goY: y * this.itemWidth,
              goStep: 0,
            }
            this.slideData.items.push(thisItem)
            this.slideData.nextId++
          }
        }
      }
      this.slideData.items.forEach(item => {
        item.isInContent = this.isInContent(item.pos)
      })

      this.isSwiping = false

      if (this.slideData.slideTimes <= 0) {
        this.slideData.slideTimes = 0
        this.gameWin()
      }
    }, 300)
  }

  fillEmptyPoses(emptyPoses: SlidePos[], plusPos: SlidePos) {
    // console.log(emptyPoses)
    const newEmptyPoses: SlidePos[] = []
    emptyPoses.forEach(ePos => {
      const nextItemId = this.getNextItem(ePos, plusPos)
      if (nextItemId > 0) {
        const nextItem = this.getItemById(nextItemId)
        const inNewIndex = newEmptyPoses.findIndex(np => np.x === nextItem.pos.x && np.y === nextItem.pos.y)
        if (inNewIndex === -1) {
          newEmptyPoses.push({ x: nextItem.pos.x, y: nextItem.pos.y })
        }
        nextItem.pos.x = ePos.x
        nextItem.pos.y = ePos.y
        nextItem.goX = ePos.x * this.itemWidth
        nextItem.goY = ePos.y * this.itemWidth
        if (nextItem.goX !== nextItem.posX) {
          nextItem.goStep = Math.abs(nextItem.goX - nextItem.posX) / this.moveTimes
        } else if (nextItem.goY !== nextItem.posY) {
          nextItem.goStep = Math.abs(nextItem.goY - nextItem.posY) / this.moveTimes
        }
      }
    })
    if (newEmptyPoses.length > 0) {
      this.fillEmptyPoses(newEmptyPoses, plusPos)
    }
  }

  getNextItem(pos: SlidePos, plusPos: SlidePos) {
    if (pos.x > this.endPos || pos.y > this.endPos || pos.x < this.startPos || pos.y < this.startPos) {
      return false
    }
    const nextItem = this.slideData.items.find(i => i.pos.x === pos.x + plusPos.x && i.pos.y === pos.y + plusPos.y)
    if (nextItem) {
      return nextItem.id
    } else {
      return this.getNextItem({ x: pos.x + plusPos.x, y: pos.y + plusPos.y }, plusPos)
    }
  }

  canSwipe() {
    return !this.slideShowData.pop.pause
      && !this.slideShowData.pop.gameover
      && !this.isSwiping
  }

  swipeLeft() {
    if (!this.canSwipe()) { return false }
    this.isSwiping = true
    this.slideData.items.forEach(item => {
      item.goX -= this.itemWidth
      item.goStep = Math.abs(item.goX - item.posX) / this.moveTimes * 2
      item.pos.x--
    })
    this.checkSameItems()
    this.removeAndCreateItems(DirectiveEnum.Left)
  }
  swipeRight() {
    if (!this.canSwipe()) { return false }
    this.isSwiping = true
    this.slideData.items.forEach(item => {
      item.goX += this.itemWidth
      item.goStep = Math.abs(item.goX - item.posX) / this.moveTimes * 2
      item.pos.x++
    })
    this.checkSameItems()
    this.removeAndCreateItems(DirectiveEnum.Right)
  }
  swipeUp() {
    if (!this.canSwipe()) { return false }
    this.isSwiping = true
    this.slideData.items.forEach(item => {
      item.goY -= this.itemWidth
      item.goStep = Math.abs(item.goY - item.posY) / this.moveTimes * 2
      item.pos.y--
    })
    this.checkSameItems()
    this.removeAndCreateItems(DirectiveEnum.Up)
  }
  swipeDown() {
    if (!this.canSwipe()) { return false }
    this.isSwiping = true
    this.slideData.items.forEach(item => {
      item.goY += this.itemWidth
      item.goStep = Math.abs(item.goY - item.posY) / this.moveTimes * 2
      item.pos.y++
    })
    this.checkSameItems()
    this.removeAndCreateItems(DirectiveEnum.Down)
  }


  // ??????
  saveData(): void {
    this.storage.save(SLIDE_SAVE.NORMAL_STORAGE, this.slideData)
  }

  loadData() {
    const loadData: any = this.storage.load(SLIDE_SAVE.NORMAL_STORAGE)
    if (loadData) {
      // this.slideData = loadData
    }
  }
}
