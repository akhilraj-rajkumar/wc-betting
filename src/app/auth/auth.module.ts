import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { AppAuthService } from '@app/core';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ], 
  providers: [AppAuthService],
  declarations: [LoginComponent]
})
export class AuthModule { }
