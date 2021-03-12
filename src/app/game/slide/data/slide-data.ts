import { SlideShowData } from './slide-type'
import { SlidePageEnum } from '../enum/slide-page.enum'

export const GUESS_SHOW_DATA: SlideShowData = {
  page: SlidePageEnum.Home,
  gameOverText: '',
  pauseTime: true,
  showTime: '',
  pop: {
    gameover: false,
    pause: false,
  },
}
