import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { UserModel } from '@app/models';
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

  userStore: Observable<UserModel>;
  user: UserModel;
  private subscription: Subscription = new Subscription();

  constructor(private socialAuthService: AuthService,
    private store: Store<IAppState>) {
      this.userStore = this.store.select(getLoggedInUser);
      this.subscription.add(this.userStore.subscribe(state => {
        this.user = state;
      }));
    }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    // const user = new UserModel();
    // user.firstName = 'test';
    // user.lastName = 'aaa';
    // user.token = '3432dsfasdf';
    // this.store.dispatch(new UserLoginAction(user));
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
