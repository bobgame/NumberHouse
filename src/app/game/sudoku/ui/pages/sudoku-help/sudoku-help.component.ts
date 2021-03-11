import { Component, OnInit } from '@angular/core'
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { SudoPageEnum } from 'src/app/game/sudoku/enum/sudoku-page.enum'

@Component({
  selector: 'nw-sudoku-help',
  templateUrl: './sudoku-help.component.html',
  styleUrls: ['./sudoku-help.component.scss'],
})
export class SudokuHelpComponent implements OnInit {

  SudoPageEnum = SudoPageEnum

  constructor(
    private d: SudokuDataService,
  ) { }

  ngOnInit() { }

  gotoPage(pageName: string) {
    this.d.sudokuShowData.page = pageName
  }

}
