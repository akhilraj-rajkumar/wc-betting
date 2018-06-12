import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { MatchModel, ErrorModel, UserModel, BetModel } from '@app/models';
import { IAppState, getMatchAllBets } from '@app/reducers';
import { MatchBetsService } from '../../services/match-bets.service';

@Component({
  selector: 'app-view-bet',
  templateUrl: './view-bet.component.html',
  styleUrls: ['./view-bet.component.css']
})
export class ViewBetComponent implements OnInit, OnDestroy, OnChanges {

  @Input() match: MatchModel;
  @Output() closePopup = new EventEmitter();

  private subscription: Subscription = new Subscription();
  matchBetsStore: Observable<BetModel>;
  matchBet: BetModel = new BetModel();

  subTitle = '';

  constructor(
    private store: Store<IAppState>,
    private matchBetsService: MatchBetsService) {
    this.matchBetsStore = this.store.select(getMatchAllBets);
    this.subscription.add(this.matchBetsStore.subscribe(state => {
      if (state) {
        this.matchBet = state;
      }
    }));
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.match.currentValue) {
      this.matchBetsService.getDetailsOfMatch(changes.match.currentValue);
      const match: MatchModel = changes.match.currentValue;
      if (match.result) {
        if (match.result > 0) {
          this.subTitle = 'You won ' + match.result + ' point(s) in this match';
        } else if (match.result < 0) {
          this.subTitle = 'You lost ' + Math.abs(match.result) + ' point(s) in this match';
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hideModal() {
    this.closePopup.emit();
  }

}
