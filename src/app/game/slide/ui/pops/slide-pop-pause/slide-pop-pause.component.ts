import { Component, OnInit } from '@angular/core'
import { SlidePageEnum } from 'src/app/game/slide/enum/slide-page.enum'
import { SlideShowData, SlideData } from '../../../data/slide-type'
import { SlideDataService } from '../../../services/slide-data.service'
import { HardAndStar } from 'src/app/game/sudoku/data/sudoku-type'

@Component({
  selector: 'nw-slide-pop-pause',
  templateUrl: './slide-pop-pause.component.html',
  styleUrls: ['./slide-pop-pause.component.scss'],
})
export class SlidePopPauseComponent implements OnInit {

  SlidePageEnum = SlidePageEnum
  slideShowData: SlideShowData
  slideData: SlideData
  hardStar: HardAndStar

  constructor(
    private d: SlideDataService,
  ) {
  }

  ngOnInit() {
    this.slideShowData = this.d.slideShowData
    this.slideData = this.d.slideData
    this.init()
  }

  init() {
    // const thisStar = this.slideData.allStars[0]
    // this.hardStar = {
    //   modeName: 'Classics',
    //   starNum: thisStar.starNum,
    //   totalTime: this.d.celTime(thisStar.totalTime),
    // }
  }

  hidePop() {
    this.d.slideShowData.pop.pause = false
    this.d.startShowTime()
  }

  gotoMenu() {
    this.d.slideShowData.page = SlidePageEnum.Home
    this.d.slideShowData.pop.pause = false
  }
}
