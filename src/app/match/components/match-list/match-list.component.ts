import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAppState, getLoggedInUser, getUpcomingMatchesList } from '@app/reducers';
import { UserModel, MatchModel } from '@app/models';

import { MatchListService } from '../../services/match-list.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit, OnDestroy {

  userStore: Observable<UserModel>;
  user: UserModel;

  matchesStorage: Observable<MatchModel[]>;
  allMatches: MatchModel[] = [];
  images: any = [1,2,3,4,5,6];
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<IAppState>,
    private matchesService: MatchListService
  ) {
    this.userStore = this.store.select(getLoggedInUser);
    this.subscription.add(this.userStore.subscribe(state => {
      this.user = state;
      // this.matchesService.fetchUpComingMatches();
    }));
    this.matchesStorage = this.store.select(getUpcomingMatchesList);
    this.subscription.add(this.matchesStorage.subscribe(state => {
      this.allMatches = state;
    }));
  }

  ngOnInit() {
    this.matchesService.fetchUpComingMatches();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
