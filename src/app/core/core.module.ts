import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppAuthService } from './authentication/auth.service';
import { AuthGuardService } from './authentication/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AppAuthService,
    AuthGuardService,
    HttpClient
  ]
})
export class CoreModule { }
