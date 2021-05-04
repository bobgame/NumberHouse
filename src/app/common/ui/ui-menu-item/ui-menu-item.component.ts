import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'nw-ui-menu-item',
  templateUrl: './ui-menu-item.component.html',
  styleUrls: ['./ui-menu-item.component.scss'],
})
export class UiMenuItemComponent {

  @Input() btnText = ''
  @Input() star = 0
  @Input() color = 0
  @Input() isSmallFZ = false

}
