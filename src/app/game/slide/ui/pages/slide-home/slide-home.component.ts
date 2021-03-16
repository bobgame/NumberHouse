import { Component, OnInit } from '@angular/core'
import { SlideDataService } from '../../../services/slide-data.service'
import { Router } from '@angular/router'
import { SlidePageEnum } from '../../../enum/slide-page.enum'
import { SlideData } from '../../../data/slide-type'

@Component({
  selector: 'nw-slide-home',
  templateUrl: './slide-home.component.html',
  styleUrls: ['./slide-home.component.scss'],
})
export class SlideHomeComponent implements OnInit {

  SlidePageEnum = SlidePageEnum
  slideData: SlideData

  constructor(
    private d: SlideDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.gotoPage('Play') // for test
    this.init()
  }

  init() {
    this.d.loadData()
    this.slideData = this.d.slideData
  }

  initGame() {
    this.d.initSlideGame()
  }

  gotoPage(pageName: string, isNewGame?: boolean) {
    if (isNewGame) {
      this.initGame()
    }
    this.d.slideShowData.page = pageName
  }

  backGameMenu() {
    this.router.navigate(['/home'])
  }

}
