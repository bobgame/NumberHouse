import { Component, OnInit } from '@angular/core'
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { SudokuShowData, SudokuData, LevelStar } from '../../../data/sudoku-type'
import { HARDMODE } from 'src/app/game/sudoku/enum/sudoku-hardmode.enum'
import { SUDOKU_PAGE } from 'src/app/game/sudoku/enum/sudoku-page.enum'

@Component({
  selector: 'nw-sudoku-pop-hard-choose',
  templateUrl: './sudoku-pop-hard-choose.component.html',
  styleUrls: ['./sudoku-pop-hard-choose.component.scss'],
})
export class SudokuPopHardChooseComponent implements OnInit {

  SUDOKU_PAGE = SUDOKU_PAGE
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
    },
    {
      hardMode: HARDMODE.NORMAL,
      hardName: '',
    },
    {
      hardMode: HARDMODE.MASTER,
      hardName: '',
    },
  ]

  constructor(
    private d: SudokuDataService,
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
      h.hardName = this.d.getModeNameWithIndex(h.hardMode)
    })
  }

  hidePop() {
    if (this.d.sudokuShowData.isHomeToPlay) {
      return
    }
    this.d.sudokuShowData.pop.hardchoose = false
  }

  chooseHardMode(hardMode: number) {
    this.d.createNewGame(hardMode)
    this.d.sudokuShowData.pop.hardchoose = false
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
    this.d.sudokuShowData.pop.hardchoose = false
  }

  gotoMenu() {
    this.d.sudokuShowData.page = SUDOKU_PAGE.HOME
    this.d.sudokuShowData.pop.hardchoose = false
  }

}
