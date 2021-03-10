import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { HomeComponent } from './home.component'
import { CommonUiModule } from '../modules/common-ui-module'
import { TranslationModule } from '../modules/translation.module'

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
        component: HomeComponent
      }
    ])
  ],
  declarations: [HomeComponent]
})
export class HomeComponentModule { }
