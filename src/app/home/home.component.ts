import { Component, OnInit } from '@angular/core'
import { AllService } from '../common/services/all.service'

interface AllGameItem {
  textKey: string
  routerLink: string
  image: string
  color: string
}

@Component({
  selector: 'nw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  AllGames: AllGameItem[] = [
    {
      textKey: 'slide.name',
      routerLink: '/slide',
      image: 'assets/images/img-sudoku.png',
      color: '',
    },
    {
      textKey: 'sudoku.name',
      routerLink: '/sudo',
      image: 'assets/images/img-sudoku.png',
      color: '',
    },
    {
      textKey: 'guess.name',
      routerLink: '/guess',
      image: 'assets/images/img-sudoku.png',
      color: '',
    },
  ]

  constructor(
    private all: AllService
  ) { }

  ngOnInit() {
    this.all.load()
  }

}
