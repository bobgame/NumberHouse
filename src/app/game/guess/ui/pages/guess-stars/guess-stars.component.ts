import { Component, OnInit } from '@angular/core';
import { GameId } from 'src/app/common/enum/game.enum';
import { GuessDataService } from '../../../services/guess-data.service'

@Component({
  selector: 'nw-guess-stars',
  templateUrl: './guess-stars.component.html',
  styleUrls: ['./guess-stars.component.scss'],
})
export class GuessStarsComponent implements OnInit {

  games = [GameId.guess]

  constructor(
    public d: GuessDataService,
  ) { }

  ngOnInit() { }
}
