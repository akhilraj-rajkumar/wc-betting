import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { UserModel } from '../models/user.model';
import { UserLoginAction } from '@app/actions';
import { Store } from '@ngrx/store';
import { IAppState, getLoggedInUser } from '@app/reducers';
import { Subscription } from 'rxjs/Subscription';

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

  user: Observable<UserModel>;
  private subscription: Subscription = new Subscription();

  constructor(private socialAuthService: AuthService,
    private store: Store<IAppState>) {
      this.user = this.store.select(getLoggedInUser);
      this.subscription.add(this.user.subscribe(state => {
        console.log('updated: ' + state.firstName);
        console.log('updated: ' + this.user['firstName']);
      }));
    }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    // this.appAuth.login();
    const user = new UserModel();
    user.firstName = 'test';
    user.lastName = 'aaa';
    user.token = '3432dsfasdf';
    this.store.dispatch(new UserLoginAction(user));
    // let socialPlatformProvider;
    // if (socialPlatform === 'facebook' ) {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform === 'google') {
    //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // }

    // this.socialAuthService.signIn(socialPlatformProvider).then(
    //   (userData) => {
    //     console.log(socialPlatform + ' sign in data : ' , userData);
    //   }
    // );
  }

}
