import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { TranslationModule } from 'src/app/modules/translation.module'
import { UiBtnComponent } from '../common/ui/ui-btn/ui-btn.component'
import { ConPopComponent } from '../common/container/con-pop/con-pop.component'
import { UiGameHeaderComponent } from '../common/ui/ui-game-header/ui-game-header.component'

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule,
    TranslationModule.forChild(),
  ],
  declarations: [
    UiBtnComponent,
    UiGameHeaderComponent,
    ConPopComponent,
  ],
  exports: [
    UiBtnComponent,
    UiGameHeaderComponent,
    ConPopComponent,
  ]
})
export class CommonUiModule { }
