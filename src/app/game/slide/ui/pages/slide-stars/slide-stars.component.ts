import { Component, OnInit } from '@angular/core';
import { GameId } from 'src/app/common/enum/game.enum';
import { SlideDataService } from '../../../services/slide-data.service'

@Component({
  selector: 'nw-slide-stars',
  templateUrl: './slide-stars.component.html',
  styleUrls: ['./slide-stars.component.scss'],
})
export class SlideStarsComponent implements OnInit {
  games = [GameId.slide]
  constructor(
    public d: SlideDataService,
  ) { }

  ngOnInit() { }

}
