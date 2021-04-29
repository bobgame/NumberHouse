import { Component, OnInit } from '@angular/core'
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { Router } from '@angular/router'
import { LevelStar, SudokuData, SudokuShowData } from '../../../data/sudoku-type'
import { SudoPageEnum } from 'src/app/game/sudoku/enum/sudoku-page.enum'
import { HARDMODE } from '../../../enum/sudoku-hardmode.enum'

@Component({
  selector: 'nw-sudoku-new-game',
  templateUrl: './sudoku-new-game.component.html',
  styleUrls: ['./sudoku-new-game.component.scss'],
})
export class SudokuNewGameComponent implements OnInit {

  SudoPageEnum = SudoPageEnum
  sudokuShowData: SudokuShowData
  sudokuData: SudokuData
  HARDMODE = HARDMODE
  isShowLevel = false
  levelStars: LevelStar[] = []
  starArr: number[] = []
  hardModeChoose = 0

  hardChooseShow = [
    {
      hardMode: HARDMODE.STARTER,
      hardName: '',
      lvText: '',
    },
    {
      hardMode: HARDMODE.NORMAL,
      hardName: '',
      lvText: '',
    },
    {
      hardMode: HARDMODE.MASTER,
      hardName: '',
      lvText: '',
    },
  ]

  constructor(
    public d: SudokuDataService,
  ) {
  }

  ngOnInit() {
    this.sudokuShowData = this.d.sudokuShowData
    this.sudokuData = this.d.sudokuData
    this.starArr = this.d.starArr
    if (this.sudokuShowData.isHomeToPlay) {
      this.d.pauseShowTime()
    }
    this.hardChooseShow.forEach(h => {
      const [name, lvText] = this.d.getModeNameWithIndex(h.hardMode)
      h.hardName = name
      h.lvText = lvText
    })
  }

  continue() {
    this.d.sudokuShowData.page = SudoPageEnum.Play
  }

  chooseHardMode(hardMode: number) {
    this.d.createNewGame(hardMode)
    this.d.sudokuShowData.page = SudoPageEnum.Play
  }

  showLevelChoose(hardMode: number) {
    this.hardModeChoose = hardMode
    this.levelStars = []
    // this.levelStars = [
    //   { lv: 1, starNum: 5 },
    //   { lv: 2, starNum: 3 },
    //   { lv: 3, starNum: 5 },
    //   { lv: 4, starNum: 1 },
    //   { lv: 5, starNum: 5 },
    //   { lv: 6, starNum: 2 },
    //   { lv: 7, starNum: 4 },
    //   { lv: 1, starNum: 5 },
    //   { lv: 2, starNum: 3 },
    //   { lv: 3, starNum: 5 },
    //   { lv: 4, starNum: 1 },
    //   { lv: 5, starNum: 5 },
    //   { lv: 6, starNum: 2 },
    //   { lv: 7, starNum: 4 },
    //   { lv: 1, starNum: 5 },
    //   { lv: 2, starNum: 3 },
    //   { lv: 3, starNum: 5 },
    //   { lv: 4, starNum: 1 },
    //   { lv: 5, starNum: 5 },
    //   { lv: 6, starNum: 2 },
    //   { lv: 1, starNum: 5 },
    //   { lv: 2, starNum: 3 },
    //   { lv: 3, starNum: 5 },
    //   { lv: 4, starNum: 1 },
    //   { lv: 5, starNum: 5 },
    //   { lv: 6, starNum: 2 },
    //   { lv: 70, starNum: 4 },
    // ]
    const allStars = this.d.sudokuData.allStars.find(a => a.mode === hardMode)
    if (allStars) {
      const levelStars = allStars.levelStars
      levelStars.forEach(ls => {
        const leverStar: LevelStar = {
          lv: ls.lv,
          starNum: ls.starNum,
          isActive: true,
          isHideStar: false
        }
        this.levelStars.push(leverStar)
      })
      this.levelStars.push({
        lv: levelStars.length + 1,
        starNum: 0,
        isActive: true,
        isHideStar: true
      })
      this.levelStars.push({
        lv: levelStars.length + 2,
        starNum: 0,
        isActive: false,
        isHideStar: true
      })
    }
    this.isShowLevel = true
  }

  chooseHardModeLevel(levelStar: LevelStar) {
    if (!levelStar.isActive) { return }
    this.d.createNewGame(this.hardModeChoose, levelStar.lv)
    this.d.sudokuShowData.page = SudoPageEnum.Play
  }

  gotoMenu() {
    this.d.sudokuShowData.page = SudoPageEnum.Home
  }

}
