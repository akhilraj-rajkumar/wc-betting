import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/reducers';
import { UserModel } from '@app/auth';
import { UserLoginAction } from '@app/actions';

@Injectable()
export class AppAuthService {
  public isLoggedIn: boolean;
  public redirectUrl: string;

  constructor(
    private router: Router, 
    private store: Store<IAppState>) {
  }

  login() {
    const user = new UserModel();
    user.firstName = 'test';
    user.lastName = 'aaa'
    user.token = '3432dsfasdf';
    this.store.dispatch(new UserLoginAction(user));
    this.isLoggedIn = true;
    if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = null;
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }
}
