import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAppState, getLoggedInUser } from '@app/reducers';
import { UserModel } from '@app/models';
import { AppAuthService } from '@app/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  userStore: Observable<UserModel>;
  user: UserModel;
  private subscription: Subscription = new Subscription();

  constructor(private appAuthService: AppAuthService,
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

  public signOut() {
    this.appAuthService.logout();
  }

}
