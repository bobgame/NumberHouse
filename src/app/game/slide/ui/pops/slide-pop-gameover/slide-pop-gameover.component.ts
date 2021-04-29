import { Component, OnInit } from '@angular/core'
import { SlideShowData } from '../../../data/slide-type'
import { SlidePageEnum } from '../../../enum/slide-page.enum'
import { SlideDataService } from '../../../services/slide-data.service'

@Component({
  selector: 'nw-slide-pop-gameover',
  templateUrl: './slide-pop-gameover.component.html',
  styleUrls: ['./slide-pop-gameover.component.scss'],
})
export class SlidePopGameoverComponent implements OnInit {

  slideShowData: SlideShowData

  constructor(
    private d: SlideDataService,
  ) {
    this.slideShowData = this.d.slideShowData
  }

  ngOnInit() { }

  hidePop() {
    this.d.slideShowData.pop.gameover = false
  }

  newGame() {
    this.d.initSlideGame()
    this.d.slideData.continue = true
    this.d.startShowTime()
    this.d.saveData()
    this.hidePop()
  }
  menu() {
    this.d.slideShowData.page = SlidePageEnum.Home
    this.hidePop()
  }

}
