import { Component, OnInit, OnDestroy, HostListener } from '@angular/core'
import { EventManager } from '@angular/platform-browser'
import { SlideDataService } from '../../../services/slide-data.service'
import { SlideData, SlideShowData } from '../../../data/slide-type'
import { fromEvent, Subscription } from 'rxjs'

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

  ngOnInit() {
    this.slideData = this.d.slideData
    this.starArr = this.d.starArr
    this.slideShowData = this.d.slideShowData
    this.d.slideData.continue = true
    this.d.startShowTime()
    this.listenKeyboard()
  }

  ngOnDestroy() {
    this.d.pauseShowTime()
    if (this.keyboardSubscription) {
      this.keyboardSubscription.unsubscribe()
    }
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
