import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { StarsComponent } from './stars.component'
import { TranslationModule } from 'src/app/modules/translation.module'
import { CommonUiModule } from 'src/app/modules/common-ui-module'
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
        component: StarsComponent
      }
    ])
  ],
  declarations: [StarsComponent],
  exports: [StarsComponent]
})
export class StarsComponentModule { }
