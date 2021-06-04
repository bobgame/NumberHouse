import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { SlideDataService } from '../../../services/slide-data.service'
import { SlideData, SlideShowData } from '../../../data/slide-type'
import { fromEvent, Subscription } from 'rxjs'
import * as PIXI from 'pixi.js'
import { Sprite } from 'pixi.js'

@Component({
  selector: 'nw-slide-play',
  templateUrl: './slide-play.component.html',
  styleUrls: ['./slide-play.component.scss'],
})
export class SlidePlayComponent implements OnInit, OnDestroy {

  constructor(
    public d: SlideDataService,
  ) { }

  slideData: SlideData
  slideShowData: SlideShowData
  starArr: Array<number> = []

  keyboardSubscription: Subscription

  numbersImage: HTMLImageElement

  @ViewChild('slideShiftContentCanvas')
  slideShiftContentCanvas: ElementRef<HTMLCanvasElement>
  @ViewChild('slideContentCanvas')
  slideContentCanvas: ElementRef<HTMLCanvasElement>

  shiftApp: PIXI.Application
  Application = PIXI.Application
  loader = new PIXI.Loader()
  resources = PIXI.Resource
  Container = PIXI.Container
  TextureCache = PIXI.utils.TextureCache
  Sprite = PIXI.Sprite
  Rectangle = PIXI.Rectangle

  rectX = 0
  rectY = 0
  timePassed = 0
  oldTimeStamp: any = 0
  movingSpeed = 800
  itemWidth = 160
  // itemWidth = 96
  itemPXY = 5
  // itemPXY = 3
  canvasWidth = 970
  id: {
    [name: string]: PIXI.Texture<PIXI.Resource>;
  }

  ngOnInit() {
    this.itemWidth = this.d.itemWidth
    // this.d.initSlideGame() // for test
    this.slideData = this.d.slideData
    this.starArr = this.d.starArr
    this.slideShowData = this.d.slideShowData
    this.d.slideData.continue = true
    this.d.startShowTime()
    this.listenKeyboard()

    setTimeout(() => {
      this.initPIXI()
    }, 0)
  }

  ngOnDestroy() {
    this.d.pauseShowTime()
    if (this.keyboardSubscription) {
      this.keyboardSubscription.unsubscribe()
    }
  }

  initPIXI() {
    this.shiftApp = new PIXI.Application({
      width: this.canvasWidth,
      height: this.canvasWidth,
      clearBeforeRender: true,
      backgroundColor: 0xcccccc,
    })
    this.slideContentCanvas.nativeElement.appendChild(this.shiftApp.view)
    this.shiftApp.loader
      .add('/assets/images/slide/numbers.json')
      .load(this.setup.bind(this))
  }

  setup() {
    this.id = this.shiftApp.loader.resources['/assets/images/slide/numbers.json'].textures
    this.shiftApp.renderer.render(this.shiftApp.stage)
    // this.gameLoop(0)
    this.shiftApp.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop = (timeStamp) => {
    let secondsPassed: any = (timeStamp - this.oldTimeStamp) / 1000
    secondsPassed = Math.min(secondsPassed, 0.1)
    this.oldTimeStamp = timeStamp
    // Pass the time to the update
    this.update(secondsPassed)
    this.shiftApp.stage.removeChildren()
    this.draw()

    // window.requestAnimationFrame(this.gameLoop)
    // setTimeout(() => {
    //   this.gameLoop(0)
    // }, 1000 / 60)
    // window.requestAnimationFrame(this.gameLoop)
  }

  draw() {
    this.d.slideData.items.forEach(item => {
      this.drawNum(item.num, item.posX, item.posY)
    })
  }

  drawNum(num, posX, posY) {
    const maskNum = 2
    if (
      posX > this.itemWidth * (this.d.showStartPos - maskNum) &&
      posX < this.itemWidth * (this.d.showEndPos + maskNum) &&
      posY > this.itemWidth * (this.d.showStartPos - maskNum) &&
      posY < this.itemWidth * (this.d.showEndPos + maskNum)
    ) {
      const item = new Sprite(this.id[num + '.png'])
      item.x = posX + this.itemPXY
      item.y = posY + this.itemPXY
      item.width = this.itemWidth
      item.height = this.itemWidth
      this.shiftApp.stage.addChild(item)
    }
  }

  update(secondsPassed) {
    this.d.slideData.items.forEach(item => {
      if (item.goX !== item.posX) {
        const compareX = item.goX - item.posX
        const addX = item.goStep < Math.abs(compareX) ? item.goStep : Math.abs(compareX)
        // const addX = move < Math.abs(compareX) ? move : Math.abs(compareX)
        if (compareX > 0) {
          item.posX += addX
        } else {
          item.posX -= addX
        }
      }
      if (item.goY !== item.posY) {
        const compareY = item.goY - item.posY
        const addY = item.goStep < Math.abs(compareY) ? item.goStep : Math.abs(compareY)
        if (compareY > 0) {
          item.posY += addY
        } else {
          item.posY -= addY
        }
      }
    })
  }
  // Example easing functions
  // easeInOutQuint(t, b, c, d) {
  //   if ((t /= d / 2) < 1) { return c / 2 * t * t * t * t * t + b }
  //   return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
  // }

  // easeLinear(t, b, c, d) {
  //   return c * t / d + b
  // }

  private listenKeyboard() {
    if (this.keyboardSubscription) {
      this.keyboardSubscription.unsubscribe()
    }
    // tslint:disable-next-line: deprecation
    this.keyboardSubscription = fromEvent(window, 'keydown').subscribe((event: any) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.swipeLeft()
          break
        case 'ArrowRight':
          this.swipeRight()
          break
        case 'ArrowUp':
          this.swipeUp()
          break
        case 'ArrowDown':
          this.swipeDown()
          break
        default:
          break
      }
    })
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

  swipeLeft() {
    this.d.swipeLeft()
  }
  swipeRight() {
    this.d.swipeRight()
  }
  swipeUp() {
    this.d.swipeUp()
  }
  swipeDown() {
    this.d.swipeDown()
  }


}
