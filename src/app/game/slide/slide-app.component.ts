import { Component, OnInit } from '@angular/core'
import { SlideDataService } from './services/slide-data.service'
import { SlideShowData } from './data/slide-type'
import { LanguageService } from 'src/app/common/services/language.service'
import { SlidePageEnum } from './enum/slide-page.enum'

@Component({
  selector: 'nw-slide-app',
  templateUrl: './slide-app.component.html',
  styleUrls: ['./slide-app.component.scss'],
})
export class SlideAppComponent implements OnInit {

  SlidePageEnum = SlidePageEnum

  slideShowData: SlideShowData

  constructor(
    private d: SlideDataService,
    private languageService: LanguageService,
  ) {
    this.slideShowData = this.d.slideShowData
  }

  ngOnInit() {

    // setInterval(() => {
    //   this.languageService.useLanguage('en')
    // }, 2000)
  }

}
