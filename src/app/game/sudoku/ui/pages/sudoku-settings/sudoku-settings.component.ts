import { Component, OnInit } from '@angular/core'
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { SudoPageEnum } from 'src/app/game/sudoku/enum/sudoku-page.enum'

@Component({
  selector: 'nw-sudoku-settings',
  templateUrl: './sudoku-settings.component.html',
  styleUrls: ['./sudoku-settings.component.scss'],
})
export class SudokuSettingsComponent implements OnInit {

  SudoPageEnum = SudoPageEnum
  constructor(
    private d: SudokuDataService,
  ) { }

  ngOnInit() { }

  gotoPage(pageName: string) {
    this.d.sudokuShowData.page = pageName
  }

}
