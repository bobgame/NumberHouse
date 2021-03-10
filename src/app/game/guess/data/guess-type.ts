export class GuessShowData {
  /** HOME PLAY HELP SETTINGS */
  page: string
  gameOverText: string
  showTime: string
  pauseTime: boolean
  pop: {
    gameover: boolean
    pause: boolean
  }
}
export class GuessData {
  continue: boolean
  len: number
  star: number
  time: number
  guessTimes: number
  guessMaxTimes: number
  allNumbers: string[]
  useTime: number
  value: string[]
  number: string[]
  results: string[]
  marks: string[]
  nowMode: number
  allStars: GuessStar[]
}

export class GuessStar {
  mode: number
  starNum: number
  totalTime: number
}
