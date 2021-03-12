import { Component, OnInit } from '@angular/core'
import { SlideDataService } from '../../../services/slide-data.service'

@Component({
  selector: 'nw-slide-settings',
  templateUrl: './slide-settings.component.html',
  styleUrls: ['./slide-settings.component.scss'],
})
export class SlideSettingsComponent implements OnInit {

  constructor(
    public d: SlideDataService,
  ) { }

  ngOnInit() { }

}
