import { Component, OnInit } from '@angular/core'
import { GuessDataService } from '../../../services/guess-data.service'

@Component({
  selector: 'nw-guess-settings',
  templateUrl: './guess-settings.component.html',
  styleUrls: ['./guess-settings.component.scss'],
})
export class GuessSettingsComponent implements OnInit {

  constructor(
    private d: GuessDataService,
  ) { }

  ngOnInit() { }

  gotoPage(pageName: string) {
    this.d.guessShowData.page = pageName
  }


}
