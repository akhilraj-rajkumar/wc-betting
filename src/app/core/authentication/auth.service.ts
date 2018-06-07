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
  // userStore: Observable<UserModel>;
  // user: UserModel;
  // private subscription: Subscription = new Subscription();

  // constructor(
  //   private router: Router,
  //   private store: Store<IAppState>,
  //   protected localStorage: LocalStorage) {
  //     this.userStore = this.store.select(getLoggedInUser);
  //     this.subscription.add(this.userStore.subscribe(state => {
  //       this.user = state;
  //     }));
  // }

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
    // const user = new UserModel();
    // user.token = userData['token'];
    // user.firstName = userData['name'];
    // this.localStorage.setItem('user', user).subscribe(() => {});
    // this.store.dispatch(new UserLoginAction(user));
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

      },
      err => {
        
      }
    );
    this.localStorage.removeItem('user').subscribe(() => {});
    this.store.dispatch(new UserLoginAction(new UserModel()));
    this.router.navigate(['/dashboard']);
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
