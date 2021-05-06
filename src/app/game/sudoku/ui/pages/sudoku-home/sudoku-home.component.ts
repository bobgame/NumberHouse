import { Component, OnInit } from '@angular/core'
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { Router } from '@angular/router'
import { SudokuData } from '../../../data/sudoku-type'
import { SudoPageEnum } from 'src/app/game/sudoku/enum/sudoku-page.enum'
import { AllService } from 'src/app/common/services/all.service'
import { GameId } from 'src/app/common/enum/game.enum'

@Component({
  selector: 'nw-sudoku-home',
  templateUrl: './sudoku-home.component.html',
  styleUrls: ['./sudoku-home.component.scss'],
})
export class SudokuHomeComponent implements OnInit {

  SudoPageEnum = SudoPageEnum
  sudokuData: SudokuData
  menuColor = 0
  nowGameId = GameId.sudoku

  constructor(
    private d: SudokuDataService,
    private router: Router,
    private all: AllService,
  ) { }

  ngOnInit() {
    this.menuColor = this.all.getMenuColor(this.nowGameId)
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
