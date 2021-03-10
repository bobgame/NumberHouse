import { SudokuShowData } from './sudoku-type'
import { SUDOKU_PAGE } from '../enum/sudoku-page.enum'

export const SUDOKU_SHOW_DATA: SudokuShowData = {
  page: SUDOKU_PAGE.HOME,
  gameOverText: '',
  pop: {
    gameover: false,
    hardchoose: false,
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
