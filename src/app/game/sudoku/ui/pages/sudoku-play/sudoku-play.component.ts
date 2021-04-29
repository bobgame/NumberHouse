import { Component, OnInit, OnDestroy } from '@angular/core'
import { SudokuDataService } from '../../../services/sudoku-data.service'
import { Subscription } from 'rxjs'
import { SudokuData, SudokuShowData, SudoCell } from '../../../data/sudoku-type'
import { SudoPageEnum } from 'src/app/game/sudoku/enum/sudoku-page.enum'

@Component({
  selector: 'nw-sudoku-play',
  templateUrl: './sudoku-play.component.html',
  styleUrls: ['./sudoku-play.component.scss'],
})
export class SudokuPlayComponent implements OnInit, OnDestroy {

  SudoPageEnum = SudoPageEnum
  endSubscription: Subscription
  numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  cellArr: SudoCell[] = []
  starArr: Array<number> = []
  sudokuData: SudokuData
  sudokuShowData: SudokuShowData

  playBtnStatus = false
  goPageStatus = true
  continueButton = false
  toolsButtonShow = 1

  constructor(
    private d: SudokuDataService,
    // private router: Router,
    // private lanService: LanService,
    // private events: Events,
  ) {
    this.starArr = this.d.starArr
    this.sudokuData = this.d.sudokuData
    this.sudokuShowData = this.d.sudokuShowData


    // this.endSubscription = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event) => {
    //   console.log('End Subscription, Time: ' + this.d.sudokuShowData.showTime, event)
    //   this.sudoPlay.playId = Math.floor(Math.random() * 1000)
    //   this.pauseShowTime()
    // })

  }

  ngOnInit() {
    this.initNumbers()
    this.initSudo()
    this.d.startShowTime()
  }
  ngOnDestroy() {
    this.d.pauseShowTime()
    // this.endSubscription.unsubscribe() // 不要忘记处理手动订阅
  }

  initNumbers() {
    this.cellArr = []
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        const num = i * 10 + j
        const cell: SudoCell = {
          number: num,
          bottomSmall: i % 3 !== 0,
          bottomMiddle: i % 3 === 0 && i !== 9,
          rightSmall: j % 3 !== 0,
          rightMiddle: j % 3 === 0 && j !== 9
        }
        this.cellArr.push(cell)
      }
    }
  }

  initSudo() {
    this.d.InitSudo().then(() => {
      if (this.d.sudokuShowData.sudoReady) { this.continueButton = true }
      // console.log(this.sudokuData)
    })
  }

  continueSudo() {
    this.goPageStatus = false
    this.startShowTime()
  }

  createNewGame(index: number) {
    this.goPageStatus = false
    this.d.createNewGame(index)
    const continueButtonSetTimeout = setTimeout(() => {
      this.continueButton = true
      clearTimeout(continueButtonSetTimeout)
    }, 1000)
  }

  outPageButtonClicked() {
    this.pauseShowTime()
    const goPageStatusSetTimeout = setTimeout(() => {
      this.goPageStatus = true
      clearTimeout(goPageStatusSetTimeout)
    }, 300)
  }

  toolsButtonShowSwitch() {
    if (this.toolsButtonShow < 2) {
      this.toolsButtonShow++
    } else {
      this.toolsButtonShow = 1
    }
  }

  newGame(): void {
    this.d.newGame()
  }

  nextLevelGame(): void {
    this.d.createNewGame(this.d.sudokuData.nowMode)
  }

  setThisEditBoardStatus() {
    return this.d.setThisEditBoardStatus()
  }

  clearPlayNumber(): void {
    this.d.clearPlayNumber()
  }

  clickPlayNumber(num: number): void {
    this.d.clickPlayNumber(num)
  }


  clickPlayOrPauseBtn() {
    this.d.pauseShowTime()
    this.d.sudokuShowData.pop.pause = true
  }

  startShowTime() {
    this.d.startShowTime()
  }

  pauseShowTime() {
    this.d.pauseShowTime()
  }

  gotoPage(pageName: string) {
    this.d.sudokuShowData.page = pageName
  }

}
