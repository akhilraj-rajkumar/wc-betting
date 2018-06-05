import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getLoggedInUser } from '@app/reducers';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '@app/models';
import { UserLoginAction } from '@app/actions';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public signInWithGoogle() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(' sign in data : ' , userData);
        const user = new UserModel();
        user.token = userData['token'];
        user.firstName = userData['name'];
        this.store.dispatch(new UserLoginAction(user));
      }
    );
  }
}
