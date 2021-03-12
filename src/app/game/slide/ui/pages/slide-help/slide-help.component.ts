import { Component, OnInit } from '@angular/core'
import { SlideDataService } from '../../../services/slide-data.service'

@Component({
  selector: 'nw-slide-help',
  templateUrl: './slide-help.component.html',
  styleUrls: ['./slide-help.component.scss'],
})
export class SlideHelpComponent implements OnInit {

  constructor(
    private d: SlideDataService,
  ) { }

  ngOnInit() { }

  gotoPage(pageName: string) {
    this.d.slideShowData.page = pageName
  }


}
