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

export class SlidePos {
  x: number
  y: number
}
export class SlideItem {
  id: number
  number: number
  name: string
  isInContent: boolean
  isDestroying?: boolean
  pos: SlidePos
}
export class SlideData {
  continue: boolean
  star: number
  lv: number
  nextId: number
  slideTimes: number
  time: number
  inPoses: SlidePos[]
  items: SlideItem[]
  nowMode: number
}

export class SlideStar {
  mode: number
  starNum: number
  totalTime: number
}
