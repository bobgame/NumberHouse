import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { SettingsComponent } from './settings.component'
import { CommonUiModule } from 'src/app/modules/common-ui-module'
import { TranslationModule } from 'src/app/modules/translation.module'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonUiModule,
    TranslationModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent
      }
    ])
  ],
  declarations: [SettingsComponent],
  exports: [SettingsComponent]
})
export class SettingsComponentModule { }
