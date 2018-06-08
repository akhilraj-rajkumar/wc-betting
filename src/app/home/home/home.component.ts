import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAppState, getLoggedInUser } from '@app/reducers';
import { UserModel } from '@app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userStore: Observable<UserModel>;
  user: UserModel;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<IAppState>) {
    this.userStore = this.store.select(getLoggedInUser);
    this.subscription.add(this.userStore.subscribe(state => {
      this.user = state;
    }));
  }

  ngOnInit() {
  }
}
