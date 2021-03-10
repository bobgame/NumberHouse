import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'nw-con-pop',
  templateUrl: './con-pop.component.html',
  styleUrls: ['./con-pop.component.scss'],
})
export class ConPopComponent implements OnInit {

  @Input() title = ''
  @Input() maskCanClick = true
  @Input() isBlack = false
  @Input() btnOk = {
    show: false,
    text: 'Ok'
  }
  @Input() btnClose = {
    show: false,
    text: 'Close'
  }
  @Input() popSize = '' // sm md lg

  @Output() hidePop = new EventEmitter<any>()
  @Output() clickOk = new EventEmitter<any>()
  @Output() clickClose = new EventEmitter<any>()

  constructor() { }

  ngOnInit() { }

  hideThisPop(event: any) {
    this.hidePop.emit(event)
  }

  clickOkBtn(event: any) {
    this.clickOk.emit(event)
  }

  clickCloseBtn(event: any) {
    this.clickClose.emit(event)
  }

}
