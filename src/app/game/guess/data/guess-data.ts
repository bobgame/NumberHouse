import { GuessShowData } from './guess-type'
import { GUESS_PAGE } from '../enum/guess-page.enum'

export const GUESS_SHOW_DATA: GuessShowData = {
  page: GUESS_PAGE.Home,
  gameOverText: '',
  pauseTime: true,
  showTime: '',
  pop: {
    gameover: false,
    pause: false,
  },
}
