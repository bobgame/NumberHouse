import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { SlideAppComponent } from './slide-app.component'
import { RouterModule } from '@angular/router'
import { TranslationModule } from 'src/app/modules/translation.module'
import { CommonUiModule } from 'src/app/modules/common-ui-module'
import { SlideHelpComponent } from './ui/pages/slide-help/slide-help.component'
import { SlideHomeComponent } from './ui/pages/slide-home/slide-home.component'
import { SlidePlayComponent } from './ui/pages/slide-play/slide-play.component'
import { SlideSettingsComponent } from './ui/pages/slide-settings/slide-settings.component'
import { SlidePopGameoverComponent } from './ui/pops/slide-pop-gameover/slide-pop-gameover.component'
import { SlidePopPauseComponent } from './ui/pops/slide-pop-pause/slide-pop-pause.component'
import { SlideStarsComponent } from './ui/pages/slide-stars/slide-stars.component'

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
        component: SlideAppComponent
      }
    ])
  ],
  declarations: [
    SlideAppComponent,
    SlideHomeComponent,
    SlideHelpComponent,
    SlidePlayComponent,
    SlideSettingsComponent,
    SlidePopGameoverComponent,
    SlidePopPauseComponent,
    SlideStarsComponent,
  ],
  exports: [
    SlideAppComponent,
  ]
})
export class SlideAppComponentModule { }
