import { Component, OnInit, Input } from '@angular/core'
import { SudoItem, SudokuData, SudokuShowData } from 'src/app/game/sudoku/data/sudoku-type'
import { SudokuDataService } from 'src/app/game/sudoku/services/sudoku-data.service'

@Component({
  selector: 'nw-sudoku-number',
  templateUrl: './sudoku-number.component.html',
  styleUrls: ['./sudoku-number.component.scss'],
})
export class SudokuNumberComponent implements OnInit {

  numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  starArr: Array<number> = []
  sudokuData: SudokuData
  sudokuShowData: SudokuShowData

  @Input() sudoItem: SudoItem

  constructor(
    private d: SudokuDataService
  ) {
    this.starArr = this.d.starArr
    this.sudokuData = this.d.sudokuData
    this.sudokuShowData = this.d.sudokuShowData
  }

  ngOnInit() { }

  checkSameNumbers(num: number) {
    this.d.checkSameNumbers(num)
  }

  setShowPlayNumber(index: number): void {
    console.log(this.d.sudokuData.sudoArr[index])
    this.d.setShowPlayNumber(index)
  }

  setThisEditBoardStatus() {
    return this.d.setThisEditBoardStatus()
  }

  numEmptyPress(index: number): void {
    this.setShowPlayNumber(index)
    this.setThisEditBoardStatus()
  }

}
