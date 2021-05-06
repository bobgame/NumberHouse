import { Component } from '@angular/core'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { LanguageService } from './common/services/language.service'
import { TranslateService } from '@ngx-translate/core'
import { THEME_COLOR } from 'src/app/common/enum/theme.enum'
import { AllService } from './common/services/all.service'

@Component({
  selector: 'nw-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  THEME_COLOR = THEME_COLOR
  themeColor = THEME_COLOR.DEFAULT
  allLangs = [
    { text: "简体中文", lang: 'zh-hans', value: 2 },
    { text: "繁体中文", lang: 'zh-hant', value: 3 },
    { text: "English", lang: 'en', value: 1 },
  ]
  isLoading = true
  isShowLangChoose = false

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private translate: TranslateService,
    private all: AllService,
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()
      // this.languageService.useLanguage()
      // this.translate.setDefaultLang('en')

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.all.load()
      setTimeout(() => {
        if (this.all.getSettings(1).value === 0) {
          this.isShowLangChoose = true
        } else {
          const thisLanValue = this.all.getSettings(2).value
          const thisLanItem = this.allLangs.find(al => al.value === thisLanValue)
          if (thisLanItem) {
            this.translate.use(thisLanItem.lang)
          } else {
            this.translate.use('en')
          }
        }
        this.isLoading = false
      }, 1500);
      // this.translate.use('zh-hans')
      // this.translate.use('en')
    })
  }

  chooseLang(lanItem) {
    this.translate.use(lanItem.lang)
    this.all.getSettings(1).value = 1
    this.all.getSettings(2).value = lanItem.value
    this.all.save()
    this.isShowLangChoose = false
  }
}
