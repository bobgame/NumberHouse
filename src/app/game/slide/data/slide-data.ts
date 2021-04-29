import { SlideData, SlideShowData } from './slide-type'
import { SlidePageEnum } from '../enum/slide-page.enum'

export const SlideShowDataDefault: SlideShowData = {
  page: SlidePageEnum.Home,
  gameOverText: '',
  pauseTime: true,
  showTime: '',
  pop: {
    gameover: false,
    pause: false,
  },
}
export const SlideDataDefault: SlideData = {
  continue: false,
  star: 0,
  lv: 1,
  nextId: 1,
  slideTimes: 5,
  slideScore: 0,
  time: 0,
  inPoses: [],
  items: [],
  nowMode: 0,
}
