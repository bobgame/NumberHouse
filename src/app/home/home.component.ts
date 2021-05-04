import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { GameId } from '../common/enum/game.enum'
import { AllService } from '../common/services/all.service'

interface AllGameItem {
  id: GameId
  textKey: string
  routerLink: string
  image: string
  color: number
  star: number
  row: number
  col: number
  isSmallFZ?: boolean
}

@Component({
  selector: 'nw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  AllGames: AllGameItem[] = [
    {
      id: GameId.slide,
      textKey: 'slide.name',
      routerLink: '/slide',
      image: 'assets/images/img-sudoku.png',
      color: 1,
      star: 10,
      row: 2,
      col: 8,
    },
    {
      id: GameId.sudoku,
      textKey: 'sudoku.name',
      routerLink: '/sudo',
      image: 'assets/images/img-sudoku.png',
      color: 2,
      star: 10,
      row: 2,
      col: 4,
    },
    {
      id: GameId.guess,
      textKey: 'guess.name',
      routerLink: '/guess',
      image: 'assets/images/img-sudoku.png',
      color: 3,
      star: 10,
      row: 2,
      col: 4,
    },
    {
      id: GameId.stars,
      textKey: 'stars.name',
      routerLink: '/guess',
      image: 'assets/images/img-sudoku.png',
      color: 0,
      star: 0,
      row: 2,
      col: 3,
      isSmallFZ: true,
    },
    {
      id: GameId.settings,
      textKey: 'settings.name',
      routerLink: '/guess',
      image: 'assets/images/img-sudoku.png',
      color: 0,
      star: 0,
      row: 2,
      col: 3,
      isSmallFZ: true,
    },
    {
      id: GameId.more,
      textKey: 'more.name',
      routerLink: '/guess',
      image: 'assets/images/img-sudoku.png',
      color: 0,
      star: 0,
      row: 2,
      col: 2,
      isSmallFZ: true,
    },
  ]

  constructor(
    private all: AllService,
    public translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.all.load()
    // this.getStars()
  }

  getStars() {
    this.all.starData.gameStars.forEach(gStar => {
      const thisGame = this.AllGames.find(a => a.id === gStar.id)
      if (thisGame) {
        thisGame.star = gStar.getStar
      }
    })
  }

}
