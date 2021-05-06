import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { TranslationModule } from 'src/app/modules/translation.module'
import { UiBtnComponent } from '../common/ui/ui-btn/ui-btn.component'
import { ConPopComponent } from '../common/container/con-pop/con-pop.component'
import { UiGameHeaderComponent } from '../common/ui/ui-game-header/ui-game-header.component'
import { ConMenuComponent } from '../common/container/con-menu/con-menu.component'
import { UiMenuItemComponent } from '../common/ui/ui-menu-item/ui-menu-item.component'
import { WidgetsStarsComponent } from '../common/widgets/widgets-stars/widgets-stars.component'

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule,
    TranslationModule.forChild(),
  ],
  declarations: [
    UiBtnComponent,
    UiMenuItemComponent,
    UiGameHeaderComponent,
    WidgetsStarsComponent,
    ConPopComponent,
    ConMenuComponent,
  ],
  exports: [
    UiBtnComponent,
    UiMenuItemComponent,
    UiGameHeaderComponent,
    WidgetsStarsComponent,
    ConPopComponent,
    ConMenuComponent,
  ]
})
export class CommonUiModule { }
