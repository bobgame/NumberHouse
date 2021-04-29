import { Injectable } from '@angular/core'
import { StorageService } from './storage.service'
import { COMMON_SAVE } from '../enum/save.enum'
import { GameId } from '../enum/game.enum'

@Injectable({
  providedIn: 'root'
})
export class AllService {

  starData: StarData = {
    star: 0,
    allGetStar: 0,
    gameStars: [
      { id: GameId.slide, getStar: 0 },
      { id: GameId.sudoku, getStar: 0 },
      { id: GameId.guess, getStar: 0 },
    ]
  }

  guessTree = {

  }

  constructor(
    private storage: StorageService,
  ) {
  }

  save() {
    this.storage.save(COMMON_SAVE.STORAGE, this.starData)
  }
  load() {
    const loadData = this.storage.load(COMMON_SAVE.STORAGE)
    if (loadData) {
      this.starData = loadData
    }
  }
}


export interface StarDataGameStar {
  id: GameId
  getStar: number
}
export interface StarData {
  star: number
  allGetStar: number
  gameStars: StarDataGameStar[]
}
