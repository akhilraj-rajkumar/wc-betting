import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { CoreModule } from '@app/core';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule
  ],
  providers: [],
  declarations: [LoginComponent]
})
export class AuthModule { }
