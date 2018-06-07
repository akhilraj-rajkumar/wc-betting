import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAppState, getLoggedInUser } from '@app/reducers';
import { UserModel } from '@app/models';
import { AppAuthService } from '@app/core';

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
    private store: Store<IAppState>,
    private appAuthService: AppAuthService) { 
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
        this.appAuthService.login(userData);
      }
    );
  }

  public signOut() {
    this.appAuthService.logout();
  }
}
