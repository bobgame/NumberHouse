import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { AllService } from 'src/app/common/services/all.service'

@Component({
  selector: 'nw-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  allLangs = [
    { id: 1, text: "简体中文", lang: 'zh-hans', value: 2 },
    { id: 2, text: "繁体中文", lang: 'zh-hant', value: 3 },
    { id: 3, text: "English", lang: 'en', value: 1 },
  ]
  constructor(
    private router: Router,
    private all: AllService,
    public translate: TranslateService,
  ) { }

  ngOnInit() { }

  backToHome() {
    this.router.navigate(['/home'])
  }
  chooseLang(lanItem) {
    this.translate.use(lanItem.lang)
    this.all.getSettings(2).value = lanItem.value
    this.all.save()
  }
}
