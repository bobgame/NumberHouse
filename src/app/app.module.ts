import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import 'hammerjs'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HttpLoaderFactory } from './modules/translation.module'
import { HttpClient, HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
