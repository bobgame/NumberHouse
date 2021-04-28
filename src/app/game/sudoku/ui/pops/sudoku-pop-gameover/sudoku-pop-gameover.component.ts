import { Component, OnInit } from '@angular/core'
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { SudokuShowData } from '../../../data/sudoku-type'
import { SudoPageEnum } from 'src/app/game/sudoku/enum/sudoku-page.enum'

@Component({
  selector: 'nw-sudoku-pop-gameover',
  templateUrl: './sudoku-pop-gameover.component.html',
  styleUrls: ['./sudoku-pop-gameover.component.scss'],
})
export class SudokuPopGameoverComponent implements OnInit {

  SudoPageEnum = SudoPageEnum
  sudokuShowData: SudokuShowData

  constructor(
    private d: SudokuDataService,
  ) {
    this.sudokuShowData = this.d.sudokuShowData
  }

  ngOnInit() { }

  hidePop() {
    this.d.sudokuShowData.pop.gameover = false
  }

  newGame() {
    this.d.sudokuShowData.isHomeToPlay = true
    this.d.sudokuShowData.page = SudoPageEnum.Play
    // this.d.resetValue(this.d.guessData.len)
    // this.d.createNumber(this.d.guessData.len, this.d.guessData.allNumbers)
    this.hidePop()
  }
  menu() {
    this.d.sudokuShowData.page = SudoPageEnum.Home
    // this.d.resetValue(this.d.guessData.len)
    // this.d.createNumber(this.d.guessData.len, this.d.guessData.allNumbers)
    this.hidePop()
  }

}
