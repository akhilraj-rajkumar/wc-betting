import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '@app/reducers';
import { UserLoginAction } from '@app/actions';
import { UserModel } from '@app/models';
import { getLoggedInUser } from '@app/reducers';
import { BaseService, SUCCESS_STATUS, FAILURE_STATUS } from '../services/base.service';

@Injectable()
export class AppAuthService extends BaseService {
  public redirectUrl: string;

  login(userData) {
    const url = 'users/login';
    const params = {
      'auth_id': userData['token']
    }
    this.postData(url, params).subscribe(
      res => {
        const responseStatus = res['status'];
        if (responseStatus === SUCCESS_STATUS) {
          const data = res['data'];
          const user = new UserModel().deserializeData(data);
          this.localStorage.setItem('user', user).subscribe(() => {});
          this.store.dispatch(new UserLoginAction(user));
        }
      },
      err => {
        console.log(err);
      }
    );
    if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = null;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    const url = 'users/logout';
    this.getData(url).subscribe(
      res => {
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.router.navigate(['/dashboard']);
      }
    );
    this.localStorage.removeItem('user').subscribe(() => {});
    this.store.dispatch(new UserLoginAction(new UserModel()));
    
  }

  updateLoggedInStatus() {
    this.localStorage.getItem<UserModel>('user').subscribe((user) => {
      if (user) {
        const model: UserModel = new UserModel().desrialisze(user);
        this.store.dispatch(new UserLoginAction(model));
      }
    });
  }

  isUserLoggedIn(): Boolean {
    return this.user.isLoggedIn();
  }
 }
