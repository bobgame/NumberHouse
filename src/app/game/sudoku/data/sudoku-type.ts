export class SudokuShowData {
  /** home play help settings */
  page: string
  gameOverText: string
  pop: {
    gameover: boolean
    hardChoose: boolean
    pause: boolean
  }
  isHomeToPlay: boolean
  isEdit: boolean
  sudoReady: boolean
  playNumber: number
  showTime: string
  pauseTime: boolean
  nowGameWin: boolean
  winStar: number
}
export class SudoCell {
  number: number
  rightSmall: boolean
  rightMiddle: boolean
  bottomSmall: boolean
  bottomMiddle: boolean
}
export class SudoItem {
  id: number
  isBlank: boolean
  isEdit: boolean
  isTip: boolean
  editBoard: boolean[]
  backupNum: number
  playNum: number
  isError: boolean
}
export class SudokuData {
  sudo: SudoItem[]
  sudoArr: number[]
  continue: boolean
  blankArr: number[]
  blankEditBoard: boolean[][]
  sudoPlayArr: number[]
  errorArr: number[]
  nowHardModeName: string
  time: number
  star: number
  nowMode: number
  nowLv: number
  mode: number[]
  allStars: AllStar[]
}
export class AllStar {
  mode: number
  starNum: number
  totalTime: number
  levelStars: LevelStar[]
}
export class LevelStar {
  lv: number
  starNum: number
  isActive?: boolean
  isHideStar?: boolean
}
export class HardAndStar {
  modeName: string
  lvText: string
  starNum: number
  totalTime: string
}
