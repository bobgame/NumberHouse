import { Component, OnInit } from '@angular/core'
import { SudokuShowData } from './data/sudoku-type'
import { SudokuDataService } from './services/sudoku-data.service'
import { SudoPageEnum } from 'src/app/game/sudoku/enum/sudoku-page.enum'

@Component({
  selector: 'nw-sd-app',
  templateUrl: './sd-app.component.html',
  styleUrls: ['./sd-app.component.scss'],
})
export class SdAppComponent implements OnInit {

  sudokuShowData: SudokuShowData
  SudoPageEnum = SudoPageEnum

  constructor(
    private d: SudokuDataService,
  ) {
    this.sudokuShowData = this.d.sudokuShowData
  }

  ngOnInit() { }

}
