import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeComponentModule) },
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
