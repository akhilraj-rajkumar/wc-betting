import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAppState, getLeaders } from '@app/reducers';
import { LeaderModel } from '@app/models';
import { LeadersService } from '../../services/leaders.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderStore: Observable<LeaderModel[]>;
  leaders: LeaderModel[];
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<IAppState>,
    private leadersService: LeadersService
  ) {
    this.leaderStore = this.store.select(getLeaders);
    this.subscription.add(this.leaderStore.subscribe(state => {
      this.leaders = state;
    }));
  }

  ngOnInit() {
    this.leadersService.fetchAllLeaders();
  }

}
