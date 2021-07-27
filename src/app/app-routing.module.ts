import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'signUp',
    component: SignUpComponent,
    // loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule),
  },
  {
    path: 'home',
    component: HomeComponent,
    // loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'home'
  },
  // {
  //   path: 'errors',
  //   loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
