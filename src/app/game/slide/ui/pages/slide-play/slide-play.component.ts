import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core'
import { EventManager } from '@angular/platform-browser'
import { SlideDataService } from '../../../services/slide-data.service'
import { SlideData, SlideShowData } from '../../../data/slide-type'
import { fromEvent, Subscription } from 'rxjs'
import { randInArr } from 'src/units/base'

@Component({
  selector: 'nw-slide-play',
  templateUrl: './slide-play.component.html',
  styleUrls: ['./slide-play.component.scss'],
})
export class SlidePlayComponent implements OnInit, OnDestroy {

  constructor(
    public d: SlideDataService,
    private eventManager: EventManager,
  ) { }

  slideData: SlideData
  slideShowData: SlideShowData
  starArr: Array<number> = []

  keyboardSubscription: Subscription

  numbersImage: HTMLImageElement

  @ViewChild('slideShiftContentCanvas')
  slideShiftContentCanvas: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    this.numbersImage = new Image();
    this.numbersImage.src = "assets/images/slide/numbers.png";
    this.slideData = this.d.slideData
    this.starArr = this.d.starArr
    this.slideShowData = this.d.slideShowData
    this.d.slideData.continue = true
    this.d.startShowTime()
    this.listenKeyboard()

    this.d.testItems()
    setTimeout(() => {
      this.initCanvas()
    }, 0);
    // setTimeout(() => {
    //   this.items.splice(this.items.length - 1, 1)
    //   console.log(this.items)
    // }, 4000);
  }



  ngOnDestroy() {
    this.d.pauseShowTime()
    if (this.keyboardSubscription) {
      this.keyboardSubscription.unsubscribe()
    }
  }

  rectX = 0
  rectY = 0
  timePassed = 0;
  oldTimeStamp: any = 0;
  context: CanvasRenderingContext2D
  movingSpeed = 800

  initCanvas() {
    this.context = this.slideShiftContentCanvas.nativeElement.getContext('2d');
    this.gameLoop(0)
  }

  gameLoop = (timeStamp) => {
    // const timeStamp: any = new Date()
    // Calculate how much time has passed
    // if (timeStamp) {
    let secondsPassed: any = (timeStamp - this.oldTimeStamp) / 1000;
    secondsPassed = Math.min(secondsPassed, 0.1);
    this.oldTimeStamp = timeStamp;
    // }

    // console.log(secondsPassed)
    // Pass the time to the update
    this.update(secondsPassed);
    this.draw();

    window.requestAnimationFrame(this.gameLoop);
  }

  draw() {
    // Clear the entire slideShiftContentCanvas
    this.context.clearRect(0, 0, this.slideShiftContentCanvas.nativeElement.width, this.slideShiftContentCanvas.nativeElement.height);

    this.d.slideData.items.forEach(item => {
      this.drawNum(item.num, item.posX, item.posY)
    })
    // for (let i = 0; i < 18; i++) {
    //   const x = i % 6
    //   const y = Math.floor(i / 6)

    //   this.context.drawImage(this.numbersImage, x * 160, y * 160, 160, 160, x * 160 + 5, y * 160 + 5, 160, 160);
    // }
  }

  drawNum(num, posX, posY) {
    const x = num % 6
    const y = Math.floor(num / 6)
    this.context.drawImage(this.numbersImage, x * 160, y * 160, 160, 160, posX + 5, posY + 5, 160, 160);
  }

  update(secondsPassed) {
    // this.timePassed = 0;
    this.timePassed += secondsPassed
    const move = this.movingSpeed * secondsPassed

    // Use different easing functions for different effects.
    // this.rectX = (move);
    // this.rectY = (move);
    this.d.slideData.items.forEach(item => {
      if (item.goX != item.posX) {
        const compareX = item.goX - item.posX
        const addX = move < Math.abs(compareX) ? move : Math.abs(compareX)
        if (compareX > 0) {
          item.posX += addX
        } else {
          item.posX -= addX
        }
      }
      if (item.goY != item.posY) {
        const compareY = item.goY - item.posY
        const addY = move < Math.abs(compareY) ? move : Math.abs(compareY)
        if (compareY > 0) {
          item.posY += addY
        } else {
          item.posY -= addY
        }
      }
    })
    // this.movingSpeed += 50

    // this.rectX = this.easeInOutQuint(this.timePassed, 50, 500, 1.5);
    // this.rectY = this.easeLinear(this.timePassed, 50, 250, 1.5);
  }
  // Example easing functions
  easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  }

  easeLinear(t, b, c, d) {
    return c * t / d + b;
  }

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
