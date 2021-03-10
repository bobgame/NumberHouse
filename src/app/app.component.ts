import { Component } from '@angular/core'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { LanguageService } from './common/services/language.service'
import { TranslateService } from '@ngx-translate/core'
import { THEME_COLOR } from 'src/app/common/enum/theme.enum'

@Component({
  selector: 'nw-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  THEME_COLOR = THEME_COLOR
  themeColor = THEME_COLOR.DEFAULT

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private translate: TranslateService,
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()
      // this.languageService.useLanguage()
      this.translate.setDefaultLang('en')

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('en')
    })
  }
}
