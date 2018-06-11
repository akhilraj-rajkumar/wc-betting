import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { UserModel } from '@app/models';
import { IAppState, getLoggedInUser } from '@app/reducers';

export const SUCCESS_STATUS = 0;
export const FAILURE_STATUS = 1;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  // private baseUrl = 'http://localhost:8000/';
  private baseUrl: string = 'http://10.6.13.18:8000/'; // akhilraj's ip
  // private baseUrl: string = 'http://10.6.9.34:8000/'; // siraj's ip
  userStore: Observable<UserModel>;
  user: UserModel;
  public subscription: Subscription = new Subscription();

  constructor(
    protected httpClient: HttpClient,
    public store: Store<IAppState>,
    public router: Router,
    public localStorage: LocalStorage
  ) {
    this.userStore = this.store.select(getLoggedInUser);
      this.subscription.add(this.userStore.subscribe(state => {
        this.user = state;
      }));
  }

  getData(url) {
    const finalUrl = this.baseUrl + url;
    let token = '';
    if (this.user.isLoggedIn()) {
      token = 'Token ' + this.user.token;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.httpClient.get(finalUrl, httpOptions);
  }

  postData(url, params) {
    const finalUrl = this.baseUrl + url;
    let token = '';
    if (this.user.isLoggedIn()) {
      token = 'Token ' + this.user.token;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.httpClient.post(finalUrl, params, httpOptions);
  }

  updateUserProfile() {
    if (this.user.isLoggedIn()) {
      const url = 'users/profile';
      this.getData(url).subscribe(
        res => {
          console.log(res);
          const responseStatus = res['status'];
          if (responseStatus === SUCCESS_STATUS) {
            const user = res['user'];
            this.user.points = user['total_points'];
            this.localStorage.setItem('user', this.user).subscribe(() => {});
          }
        },
        err => {

        }
      )
    }
  }
}
