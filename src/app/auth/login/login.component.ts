import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

import { AppAuthService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @select(state => state.user.loggedInUser) loggedInUser;

  constructor(private socialAuthService: AuthService,
  private appAuth: AppAuthService) { }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    this.appAuth.login();
    let socialPlatformProvider;
    if (socialPlatform === 'facebook' ) {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
      }
    );
  }

}
