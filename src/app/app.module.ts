import { Injectable, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { AdMob } from '@admob-plus/ionic/ngx';

import * as Hammer from 'hammerjs'
import {
  HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HttpLoaderFactory } from './modules/translation.module'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { CommonUiModule } from './modules/common-ui-module'

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  } as any
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    HammerModule,
    CommonUiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    AdMob,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
