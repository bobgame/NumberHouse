import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'nw-ui-game-header',
  templateUrl: './ui-game-header.component.html',
  styleUrls: ['./ui-game-header.component.scss'],
})
export class UiGameHeaderComponent implements OnInit {

  @Input() headerTitle = ''
  @Input() preTitle = ''
  @Input() isBackShow = false
  @Output() clickBack = new EventEmitter<any>()

  constructor() { }

  ngOnInit() { }

  clickBackBtn(event: any) {
    this.clickBack.emit(event)
  }

}
