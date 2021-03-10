import { Component, OnInit } from '@angular/core'
import { AllService } from '../common/services/all.service'

@Component({
  selector: 'nw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private all: AllService
  ) { }

  ngOnInit() {
    this.all.load()
  }

}
