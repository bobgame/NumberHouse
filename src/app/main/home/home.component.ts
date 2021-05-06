import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { GameId } from '../../common/enum/game.enum'
import { AllService } from '../../common/services/all.service'


@Component({
  selector: 'nw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {


  constructor(
    public all: AllService,
    public translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.getStars()
  }

  getStars() {
    this.all.allData.gameStars.forEach(gStar => {
      const thisGame = this.all.allGames.find(a => a.id === gStar.id)
      if (thisGame) {
        thisGame.star = gStar.getStar
      }
    })
  }

}
