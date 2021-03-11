import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { SdAppComponent } from './sd-app.component'
import { RouterModule } from '@angular/router'

import { TranslationModule } from 'src/app/modules/translation.module'
import { CommonUiModule } from 'src/app/modules/common-ui-module'

import { SudokuHomeComponent } from './ui/pages/sudoku-home/sudoku-home.component'
import { SudokuHelpComponent } from './ui/pages/sudoku-help/sudoku-help.component'
import { SudokuPlayComponent } from './ui/pages/sudoku-play/sudoku-play.component'
import { SudokuNumberComponent } from './ui/pages/sudoku-play/sub/sudoku-number/sudoku-number.component'
import { SudokuSettingsComponent } from './ui/pages/sudoku-settings/sudoku-settings.component'
import { SudokuPopGameoverComponent } from './ui/pops/sudoku-pop-gameover/sudoku-pop-gameover.component'
import { SudokuPopPauseComponent } from './ui/pops/sudoku-pop-pause/sudoku-pop-pause.component'
import { SudokuNewGameComponent } from './ui/pages/sudoku-new-game/sudoku-new-game.component'

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
        component: SdAppComponent
      }
    ])
  ],
  declarations: [
    SdAppComponent,
    SudokuHomeComponent,
    SudokuNewGameComponent,
    SudokuHelpComponent,
    SudokuPlayComponent,
    SudokuNumberComponent,
    SudokuSettingsComponent,
    SudokuPopGameoverComponent,
    SudokuPopPauseComponent,
  ],
  exports: [SdAppComponent]
})
export class SdAppComponentModule { }
