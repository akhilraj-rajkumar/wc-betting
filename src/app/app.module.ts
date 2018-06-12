import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from '@app/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared';
import { AppBootstrapModule } from '@app/bootstrap';
import { reducers, metaReducers } from '@app/reducers';

import { LocalStorage } from '@ngx-pwa/local-storage';
import { OwlModule } from 'ngx-owl-carousel';
import { LoadingModule } from 'ngx-loading';
import { TooltipModule } from 'ngx-bootstrap';

// Libraries
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('908897090124-vk3a6ces6lnvitticmq0orpeapuerev1.apps.googleusercontent.com')
        },
      ]
    );
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AppBootstrapModule,
    SocialLoginModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    HttpClientModule,
    OwlModule,
    LoadingModule,
    TooltipModule.forRoot(),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    LocalStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
