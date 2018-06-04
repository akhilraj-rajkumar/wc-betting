import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAuthService } from './authentication/auth.service';
import { AuthGuardService } from './authentication/auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AppAuthService,
    AuthGuardService
  ]
})
export class CoreModule { }
