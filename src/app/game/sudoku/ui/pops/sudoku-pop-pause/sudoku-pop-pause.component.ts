import { Component, OnInit } from '@angular/core'
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { SudokuShowData, SudokuData, HardAndStar } from '../../../data/sudoku-type'
import { HARDMODE } from 'src/app/game/sudoku/enum/sudoku-hardmode.enum'
import { SUDOKU_PAGE } from 'src/app/game/sudoku/enum/sudoku-page.enum'

@Component({
  selector: 'nw-sudoku-pop-pause',
  templateUrl: './sudoku-pop-pause.component.html',
  styleUrls: ['./sudoku-pop-pause.component.scss'],
})
export class SudokuPopPauseComponent implements OnInit {

  SUDOKU_PAGE = SUDOKU_PAGE
  sudokuShowData: SudokuShowData
  sudokuData: SudokuData
  HARDMODE = HARDMODE
  hardAndStars: HardAndStar[] = []

  constructor(
    private d: SudokuDataService,
  ) {
    this.sudokuShowData = this.d.sudokuShowData
    this.sudokuData = this.d.sudokuData
  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.hardAndStars = []
    this.d.sudokuData.allStars.forEach((as, index) => {
      const hardStar: HardAndStar = {
        modeName: this.d.getModeNameWithIndex(index),
        starNum: as.starNum,
        totalTime: this.d.celTime(as.totalTime),
      }
      this.hardAndStars.push(hardStar)
    })
  }

  hidePop() {
    this.d.sudokuShowData.pop.pause = false
    this.d.startShowTime()
  }

  gotoMenu() {
    this.d.sudokuShowData.page = SUDOKU_PAGE.HOME
    this.d.sudokuShowData.pop.hardchoose = false
  }

}
