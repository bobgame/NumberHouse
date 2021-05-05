import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  // { path: '', redirectTo: 'slide', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./main/home/home.module').then(m => m.HomeComponentModule) },
  { path: 'stars', loadChildren: () => import('./main/stars/stars.module').then(m => m.StarsComponentModule) },
  { path: 'settings', loadChildren: () => import('./main/settings/settings.module').then(m => m.SettingsComponentModule) },
  { path: 'sudo', loadChildren: () => import('./game/sudoku/sd-app.module').then(m => m.SdAppComponentModule) },
  { path: 'guess', loadChildren: () => import('./game/guess/gs-app.module').then(m => m.GsAppComponentModule) },
  { path: 'slide', loadChildren: () => import('./game/slide/slide-app.module').then(m => m.SlideAppComponentModule) },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadAllModules }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
