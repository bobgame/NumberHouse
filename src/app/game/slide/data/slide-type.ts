export class SlideShowData {
  /** Home Play Help Settings */
  page: string
  gameOverText: string
  showTime: string
  pauseTime: boolean
  pop: {
    gameover: boolean
    pause: boolean
  }
}
export class SlideData {
  continue: boolean
  len: number
  star: number
  time: number
  slideTimes: number
  slideMaxTimes: number
  allNumbers: string[]
  useTime: number
  value: string[]
  number: string[]
  results: string[]
  marks: string[]
  nowMode: number
  allStars: SlideStar[]
}

export class SlideStar {
  mode: number
  starNum: number
  totalTime: number
}
