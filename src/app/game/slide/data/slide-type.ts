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
  num: number
  isInContent: boolean
  isDestroying?: boolean
  destroyNum: number
  pos: SlidePos
  posX: number
  posY: number
  goX: number
  goY: number
}
export class SlideData {
  continue: boolean
  star: number
  lv: number
  nextId: number
  slideTimes: number
  slideScore: number
  time: number
  inPoses: SlidePos[]
  items: SlideItem[]
  nowMode: number
}

export class SlideNumItem {
  num: number
  x: number
  y: number
  posX: number
  posY: number
  goX: number
  goY: number
}

export class SlideStar {
  mode: number
  starNum: number
  totalTime: number
}
