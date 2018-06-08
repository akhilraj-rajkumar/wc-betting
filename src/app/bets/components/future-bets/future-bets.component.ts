import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { IAppState, getBetSuccess } from '@app/reducers';
import { MatchModel } from '@app/models';

@Component({
  selector: 'app-future-bets',
  templateUrl: './future-bets.component.html',
  styleUrls: ['./future-bets.component.css']
})
export class FutureBetsComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  allMatches: MatchModel[] = [];
  betSuccessStore: Observable<MatchModel>;

  constructor(private store: Store<IAppState>) {
    this.betSuccessStore = this.store.select(getBetSuccess);
    this.subscription.add(this.betSuccessStore.subscribe(state => {
      if (state) {
        const filtered = this.allMatches.filter( item => item.id === state.id);
        filtered.forEach(element => {
          element.updatePointsFromCopy(state);
        });
        if (filtered.length == 0) {
          this.allMatches.push(state);
        }
      }
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
