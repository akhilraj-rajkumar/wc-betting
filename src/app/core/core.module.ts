import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './authentication/auth.service';
import { AuthGuardService } from './authentication/auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuardService
  ]
})
export class CoreModule { }
