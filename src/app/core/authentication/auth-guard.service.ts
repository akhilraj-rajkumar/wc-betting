import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppAuthService } from './auth.service';
import { UserModel } from '@app/models';
import { IAppState, getLoggedInUser } from '@app/reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  userStore: Observable<UserModel>;
  user: UserModel;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AppAuthService,
    private router: Router,
    public store: Store<IAppState>) {
      this.userStore = this.store.select(getLoggedInUser);
      this.subscription.add(this.userStore.subscribe(state => {
        this.user = state;
      }));
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const path = route.routeConfig.path;
    if (path === 'dashboard') {
      this.authService.updateLoggedInStatus();
      return true;
    } else if (this.user.isLoggedIn()) {
        return true;
    } else {
      this.router.navigate(['dashboard']);
      return false;
    }
    // if (this.authService.isLoggedIn) {
    //   return true;
    // } else {
    //   this.authService.redirectUrl = state.url;
    //   this.router.navigate(['auth']);
    //   return false;
    // }
    // return true;
  }
}
