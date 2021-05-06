import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreComponent } from './more.component';
import { RouterModule } from '@angular/router';
import { CommonUiModule } from 'src/app/modules/common-ui-module';
import { TranslationModule } from 'src/app/modules/translation.module';

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
        component: MoreComponent
      }
    ])],
  declarations: [MoreComponent],
  exports: [MoreComponent]
})
export class MoreComponentModule { }
