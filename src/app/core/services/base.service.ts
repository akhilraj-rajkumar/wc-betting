import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
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

  private baseUrl: string = 'http://127.0.0.1:8000/'
  userStore: Observable<UserModel>;
  user: UserModel;
  private subscription: Subscription = new Subscription();

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
    var token = ''
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
    var token = ''
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
}
