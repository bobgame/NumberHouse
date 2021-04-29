import { Component, OnInit } from '@angular/core'
import { GameId } from '../common/enum/game.enum'
import { AllService } from '../common/services/all.service'

enum GameItemSize {
  large = 'large',
  big = 'big',
  normal = 'normal',
  small = 'small',
}
interface AllGameItem {
  id: GameId
  textKey: string
  routerLink: string
  image: string
  color: string
  size: GameItemSize
  star: number
}

@Component({
  selector: 'nw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  GameItemSize = GameItemSize

  AllGames: AllGameItem[] = [
    {
      id: GameId.slide,
      textKey: 'slide.name',
      routerLink: '/slide',
      image: 'assets/images/img-sudoku.png',
      color: '',
      size: GameItemSize.big,
      star: 0,
    },
    {
      id: GameId.sudoku,
      textKey: 'sudoku.name',
      routerLink: '/sudo',
      image: 'assets/images/img-sudoku.png',
      color: '',
      size: GameItemSize.normal,
      star: 0,
    },
    {
      id: GameId.guess,
      textKey: 'guess.name',
      routerLink: '/guess',
      image: 'assets/images/img-sudoku.png',
      color: '',
      size: GameItemSize.normal,
      star: 0,
    },
  ]

  constructor(
    private all: AllService
  ) { }

  ngOnInit() {
    this.all.load()
    this.getStars()
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
