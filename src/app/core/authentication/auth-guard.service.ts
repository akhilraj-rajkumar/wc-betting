import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppAuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AppAuthService,
    private router: Router) {
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const path = route.routeConfig.path;
    if (path === 'dashboard') {
      this.authService.updateLoggedInStatus()
      return true;
    } else if (this.authService.isUserLoggedIn()) {
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
