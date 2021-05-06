import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public isLanguageLoaded = false
  private readonly defaultLanguage = 'en'
  private readonly supportedLanguages: Array<string> = [
    'en',
    'zh-hans',
    'zh-hant',
  ]

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(this.supportedLanguages)
  }

  setDefault() {
  }

  useLanguage(lang: string = this.defaultLanguage) {
    this.translate.setDefaultLang(this.defaultLanguage)
    this.isLanguageLoaded = true
    let lan = lang.toLowerCase()
    console.log(lan)
    const isLanSupported = this.isLanSupported(lan)
    lan = isLanSupported ? lan : this.defaultLanguage
    this.translate.use(lan)
      .subscribe(() => {
        // console.log(111)
      })
  }

  isLanSupported(lang: string): boolean {
    if (lang) {
      return this.supportedLanguages.includes(lang.toLowerCase())
    }
    return false
  }
}
