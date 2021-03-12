import { Component, OnInit } from '@angular/core'
import { GuessDataService } from './services/guess-data.service'
import { GuessShowData } from './data/guess-type'
import { LanguageService } from 'src/app/common/services/language.service'
import { GuessPageEnum } from './enum/guess-page.enum'

@Component({
  selector: 'nw-gs-app',
  templateUrl: './gs-app.component.html',
  styleUrls: ['./gs-app.component.scss'],
})
export class GsAppComponent implements OnInit {

  GuessPageEnum = GuessPageEnum

  guessShowData: GuessShowData

  constructor(
    private d: GuessDataService,
    private languageService: LanguageService,
  ) {
    this.guessShowData = this.d.guessShowData
  }

  ngOnInit() {

    // setInterval(() => {
    //   this.languageService.useLanguage('en')
    // }, 2000)
  }

}
