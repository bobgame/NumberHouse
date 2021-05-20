import { Component } from '@angular/core'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { LanguageService } from './common/services/language.service'
import { TranslateService } from '@ngx-translate/core'
import { THEME_COLOR } from 'src/app/common/enum/theme.enum'
import { AllService } from './common/services/all.service'
import { AdMob } from '@admob-plus/ionic/ngx';
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
    private admob: AdMob
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(async () => {
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
      try {
        await this.admob.start();
        const banner = new this.admob.BannerAd({
          adUnitId: 'ca-app-pub-3422659975829631/5322510993',
          position: 'top',
        });
        // alert('new this.admob.BannerAd end')
        await banner.show().then(() => {
          // alert('await banner.show()')
        });

        // this.admob.on('admob.banner.impression').subscribe(async () => {
        //   await banner.hide();
        // });


        // const interstitial = new this.admob.InterstitialAd({
        //   adUnitId: 'ca-app-pub-3422659975829631/9307123505',
        // })

        // await interstitial.load()
        // await interstitial.show()
      } catch (error) {

      }

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
