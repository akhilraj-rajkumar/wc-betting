import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { AuthModule } from '@app/auth';
import { HomeModule } from '@app/home';
import { UserModule } from '@app/user';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: '@app/auth/auth.module#AuthModule'
  },
  {
    path: 'dashboard',
    loadChildren: '@app/home/home.module#HomeModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'user',
    loadChildren: '@app/user/user.module#UserModule',
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
