import { Component, OnInit } from '@angular/core';
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { SudoPageEnum } from 'src/app/game/sudoku/enum/sudoku-page.enum'
import { GameId } from 'src/app/common/enum/game.enum';

@Component({
  selector: 'nw-sudoku-stars',
  templateUrl: './sudoku-stars.component.html',
  styleUrls: ['./sudoku-stars.component.scss'],
})
export class SudokuStarsComponent implements OnInit {
  games = [GameId.sudoku]
  SudoPageEnum = SudoPageEnum
  constructor(
    private d: SudokuDataService,
  ) { }

  ngOnInit() { }

  gotoPage(pageName: string) {
    this.d.sudokuShowData.page = pageName
  }

}
