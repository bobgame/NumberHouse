import { Component, OnInit } from '@angular/core'
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { Router } from '@angular/router'
import { SudokuData } from '../../../data/sudoku-type'
import { SudoPageEnum } from 'src/app/game/sudoku/enum/sudoku-page.enum'

@Component({
  selector: 'nw-sudoku-home',
  templateUrl: './sudoku-home.component.html',
  styleUrls: ['./sudoku-home.component.scss'],
})
export class SudokuHomeComponent implements OnInit {

  SudoPageEnum = SudoPageEnum
  sudokuData: SudokuData
  menuColor = 2

  constructor(
    private d: SudokuDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.d.loadData()
    this.sudokuData = this.d.sudokuData
    // this.gotoPage(SudoPageEnum.NewGame) // for test
  }

  gotoPage(pageName: string, chooseMode?: boolean) {
    if (chooseMode) {
      this.d.sudokuShowData.isHomeToPlay = true
      this.d.sudokuShowData.page = SudoPageEnum.Play
    }
    this.d.sudokuShowData.page = pageName
  }

  backGameMenu() {
    this.router.navigate(['/home'])
  }

}
