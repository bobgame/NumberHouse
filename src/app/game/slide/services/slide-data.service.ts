import { Injectable } from '@angular/core'
import { SlideShowData, SlideData, SlideItem, SlidePos } from '../data/slide-type'
import { SLIDE_SHOW_DATA } from '../data/slide-data'
import { SLIDE_SAVE } from '../enum/slide-save.enum'
import { objCopy } from 'src/units/ObjCopy'
import { CelShowTime } from 'src/units/get-time'
import { StorageService } from 'src/app/common/services/storage.service'
import { AllService } from 'src/app/common/services/all.service'
import { SlidePageEnum } from '../enum/slide-page.enum'
import { randInArr } from 'src/units/base'
import { DirectiveEnum } from 'src/app/common/enum/directive.enum'

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
    slideTimes: 10,
    slideScore: 0,
    time: 0,
    inPoses: [],
    items: [],
    nowMode: 0,
  }

  isSwiping = false
  needRMItemIds: number[] = []

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

  initSlideGame() {
    this.initPoses()
    this.initSlideItems()
  }

  initPoses() {
    this.slideData.inPoses = []
    for (let x = 6; x <= 9; x++) {
      for (let y = 6; y <= 9; y++) {
        this.slideData.inPoses.push({ x, y })
      }
    }
  }

  initSlideItems() {
    this.slideData.slideScore = 0
    this.slideData.items = []
    for (let x = 1; x <= 14; x++) {
      for (let y = 1; y <= 14; y++) {
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

  isInContent(pos: SlidePos) {
    const { x, y } = pos
    if (x >= 6 && x <= 9 && y >= 6 && y <= 9) {
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
    if (this.slideData.slideTimes <= 0) {
      this.slideData.slideTimes = 0
      this.gameWin()
    }
    this.slideData.items.forEach(item => {
      item.isInContent = this.isInContent(item.pos)
    })
    const sameItemIds: number[][] = []
    for (let x = 6; x <= 9; x++) {
      for (let y = 6; y <= 9; y++) {
        const p = { x, y }
        const thisItem = this.getItemByPos(p)
        if (thisItem) {
          const nearItems = this.getNearInItems(p)
          nearItems.forEach(nearItem => {
            if (thisItem.number === nearItem.number) {
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
    sameItemIds.forEach(s => {
      if (s.length > 2) {
        this.needRMItemIds = this.needRMItemIds.concat(s)
      }
    })
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
        if (item.pos.x > 14 || item.pos.y > 14 || item.pos.x < 0 || item.pos.y < 0) {
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
      for (let x = 1; x <= 14; x++) {
        for (let y = 1; y <= 14; y++) {
          const nowNumbers = [1, 2, 3, 4]
          const num = randInArr(nowNumbers)
          const isInItem = this.slideData.items.find(i => i.pos.x === x && i.pos.y === y)
          if (!isInItem) {
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
      this.slideData.items.forEach(item => {
        item.isInContent = this.isInContent(item.pos)
      })

      this.isSwiping = false
    }, 800)
  }

  fillEmptyPoses(emptyPoses: SlidePos[], plusPos: SlidePos) {
    console.log(emptyPoses)
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
      }
    })
    if (newEmptyPoses.length > 0) {
      this.fillEmptyPoses(newEmptyPoses, plusPos)
    }
  }

  getNextItem(pos: SlidePos, plusPos: SlidePos) {
    if (pos.x > 14 || pos.y > 14 || pos.x < 0 || pos.y < 0) {
      return false
    }
    const nextItem = this.slideData.items.find(i => i.pos.x === pos.x + plusPos.x && i.pos.y === pos.y + plusPos.y)
    if (nextItem) {
      return nextItem.id
    } else {
      return this.getNextItem({ x: pos.x + plusPos.x, y: pos.y + plusPos.y }, plusPos)
    }
  }

  swipeLeft() {
    if (this.isSwiping) { return false }
    this.isSwiping = true
    this.slideData.items.forEach(item => {
      item.pos.x--
    })
    this.checkSameItems()
    this.removeAndCreateItems(DirectiveEnum.Left)
  }
  swipeRight() {
    if (this.isSwiping) { return false }
    this.isSwiping = true
    this.slideData.items.forEach(item => {
      item.pos.x++
    })
    this.checkSameItems()
    this.removeAndCreateItems(DirectiveEnum.Right)
  }
  swipeUp() {
    if (this.isSwiping) { return false }
    this.isSwiping = true
    this.slideData.items.forEach(item => {
      item.pos.y--
    })
    this.checkSameItems()
    this.removeAndCreateItems(DirectiveEnum.Up)
  }
  swipeDown() {
    if (this.isSwiping) { return false }
    this.isSwiping = true
    this.slideData.items.forEach(item => {
      item.pos.y++
    })
    this.checkSameItems()
    this.removeAndCreateItems(DirectiveEnum.Down)
  }


  // 存档
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
