import { Injectable } from '@angular/core'
import { StorageService } from './storage.service'
import { COMMON_SAVE } from '../enum/save.enum'
import { GameId } from '../enum/game.enum'

@Injectable({
  providedIn: 'root'
})
export class AllService {

  allData: StarData = {
    star: 0,
    allGetStar: 0,
    settings: [],
    gameStars: [
      { id: GameId.slide, getStar: 0 },
      { id: GameId.sudoku, getStar: 0 },
      { id: GameId.guess, getStar: 0 },
    ]
  }

  allGames: AllGameItem[] = [
    {
      id: GameId.slide,
      textKey: 'slide.name',
      routerLink: '/slide',
      image: 'assets/images/img-sudoku.png',
      color: 1,
      star: 0,
      row: 2,
      col: 8,
    },
    {
      id: GameId.sudoku,
      textKey: 'sudoku.name',
      routerLink: '/sudo',
      image: 'assets/images/img-sudoku.png',
      color: 2,
      star: 0,
      row: 2,
      col: 4,
    },
    {
      id: GameId.guess,
      textKey: 'guess.name',
      routerLink: '/guess',
      image: 'assets/images/img-sudoku.png',
      color: 3,
      star: 0,
      row: 2,
      col: 4,
    },
    {
      id: GameId.stars,
      textKey: 'stars.name',
      routerLink: '/stars',
      image: 'assets/images/img-sudoku.png',
      color: 0,
      star: 0,
      row: 2,
      col: 3,
      isSmallFZ: true,
    },
    {
      id: GameId.settings,
      textKey: 'settings.name',
      routerLink: '/settings',
      image: 'assets/images/img-sudoku.png',
      color: 0,
      star: 0,
      row: 2,
      col: 3,
      isSmallFZ: true,
    },
    {
      id: GameId.more,
      textKey: 'more.name',
      routerLink: '/more',
      image: 'assets/images/img-sudoku.png',
      color: 0,
      star: 0,
      row: 2,
      col: 2,
      isSmallFZ: true,
    },
  ]

  constructor(
    private storage: StorageService,
  ) {
  }

  getMenuColor(gameId: GameId) {
    const thisGameMenu = this.allGames.find(a => a.id === gameId)
    return thisGameMenu?.color || 0
  }
  /**
   * 
   * @param id // settings description
   * 
   * 1 已设置过语言 value: 0 未设置  1 已设置
   * 
   * 2 语言 value: 0 未设置默认en  1 en  2 zh-hans  3 zh-hant
   * 
   */
  getSettings(id: number) {
    const thisSet = this.allData.settings.find(s => s.id === id)
    if (thisSet) {
      return thisSet
    } else {
      this.allData.settings.push({ id, value: 0 })
      return this.getSettings(id)
    }
  }

  save() {
    this.storage.save(COMMON_SAVE.STORAGE, this.allData)
  }
  load() {
    const loadData = this.storage.load(COMMON_SAVE.STORAGE)
    if (loadData) {
      this.allData = loadData
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
  settings: SettingItem[]
  gameStars: StarDataGameStar[]
}

interface AllGameItem {
  id: GameId
  textKey: string
  routerLink: string
  image: string
  color: number
  star: number
  row: number
  col: number
  isSmallFZ?: boolean
}

export interface SettingItem {
  id: number
  value: number
}

export const DefaultSettings = []

