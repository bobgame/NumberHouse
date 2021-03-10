import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { GsAppComponent } from './gs-app.component'
import { RouterModule } from '@angular/router'
import { GuessHomeComponent } from './ui/pages/guess-home/guess-home.component'
import { GuessHelpComponent } from './ui/pages/guess-help/guess-help.component'
import { GuessPlayComponent } from './ui/pages/guess-play/guess-play.component'
import { GuessSettingsComponent } from './ui/pages/guess-settings/guess-settings.component'
import { TranslationModule } from 'src/app/modules/translation.module'
import { CommonUiModule } from 'src/app/modules/common-ui-module'
import { GuessPopGameoverComponent } from './ui/pops/guess-pop-gameover/guess-pop-gameover.component'
import { GuessPopPauseComponent } from './ui/pops/guess-pop-pause/guess-pop-pause.component'

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
        component: GsAppComponent
      }
    ])
  ],
  declarations: [
    GsAppComponent,
    GuessHomeComponent,
    GuessHelpComponent,
    GuessPlayComponent,
    GuessSettingsComponent,
    GuessPopGameoverComponent,
    GuessPopPauseComponent,
  ],
  exports: [
    GsAppComponent,
  ]
})
export class GsAppComponentModule { }
