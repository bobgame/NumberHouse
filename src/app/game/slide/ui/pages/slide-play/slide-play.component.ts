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
