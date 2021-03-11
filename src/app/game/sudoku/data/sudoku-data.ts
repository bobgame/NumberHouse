import { SudokuShowData } from './sudoku-type'
import { SudoPageEnum } from '../enum/sudoku-page.enum'

export const SUDOKU_SHOW_DATA: SudokuShowData = {
  page: SudoPageEnum.Home,
  gameOverText: '',
  pop: {
    gameover: false,
    hardChoose: false,
    pause: false,
  },
  isHomeToPlay: false,
  isEdit: false,
  sudoReady: false,
  playNumber: null,
  showTime: '00:00',
  pauseTime: false,
  nowGameWin: false,
  winStar: 0,
}
