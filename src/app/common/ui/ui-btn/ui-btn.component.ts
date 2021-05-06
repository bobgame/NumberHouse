import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'nw-ui-btn',
  templateUrl: './ui-btn.component.html',
  styleUrls: ['./ui-btn.component.scss'],
})
export class UiBtnComponent implements OnInit {

  @Input() btnText = ''
  @Input() btnSize = 'md' // sm md lg full
  @Input() isRightIcon = false
  @Input() rightIconName = ''
  @Input() isHighlight = false

  @Output() btnClick = new EventEmitter<any>()
  @Output() iconClick = new EventEmitter<any>()

  constructor() { }

  ngOnInit() { }

  clickBtn(event: any) {
    this.btnClick.emit(event)
  }
  clickIcon(event: any) {
    this.iconClick.emit(event)
  }

}
