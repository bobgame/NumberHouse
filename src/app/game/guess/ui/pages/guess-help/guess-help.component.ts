import { Component, OnInit } from '@angular/core'
import { GuessDataService } from '../../../services/guess-data.service'

@Component({
  selector: 'nw-guess-help',
  templateUrl: './guess-help.component.html',
  styleUrls: ['./guess-help.component.scss'],
})
export class GuessHelpComponent implements OnInit {

  constructor(
    private d: GuessDataService,
  ) { }

  ngOnInit() { }

  gotoPage(pageName: string) {
    this.d.guessShowData.page = pageName
  }


}
