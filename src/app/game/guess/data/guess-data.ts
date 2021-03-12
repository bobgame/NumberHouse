import { GuessShowData } from './guess-type'
import { GuessPageEnum } from '../enum/guess-page.enum'

export const GUESS_SHOW_DATA: GuessShowData = {
  page: GuessPageEnum.Home,
  gameOverText: '',
  pauseTime: true,
  showTime: '',
  pop: {
    gameover: false,
    pause: false,
  },
}
