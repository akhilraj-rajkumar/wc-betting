import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService, SUCCESS_STATUS, FAILURE_STATUS } from '@app/core';
import { MatchModel, ErrorModel } from '@app/models';
import { BetAddedSuccessAction, BetAddedFailedAction, MatchBetsListedAction } from '@app/actions';
import { getBetMatchesList, getUpcomingMatchesList } from '@app/reducers';

@Injectable({
  providedIn: 'root'
})
export class AddBetService extends BaseService {

  addedBets: MatchModel[] = [];
  betsStore: Observable<MatchModel[]>;

  matchesStorage: Observable<MatchModel[]>;
  allMatches: MatchModel[] = [];

  addBet(match: MatchModel, pointDiff: number) {
    this.betsStore = this.store.select(getBetMatchesList);
    this.subscription.add(this.betsStore.subscribe(state => {
        this.addedBets = state;
    }));
    this.matchesStorage = this.store.select(getUpcomingMatchesList);
    this.subscription.add(this.matchesStorage.subscribe(state => {
      this.allMatches = state;
    }));
    const url = 'match/bid';
    const params = {
      match_id: match.id,
      match_bids: [
        { team_id: match.homeTeam.id, number_of_bids: match.homeTeamBets },
        { team_id: match.awayTeam.id, number_of_bids: match.awayTemaBets },
        { team_id: 2, number_of_bids: match.drawBets }
      ]
    };
    this.postData(url, params).subscribe(
      res => {
        const responseStatus = res['status'];
        if (responseStatus === SUCCESS_STATUS) {
          this.user.points = this.user.points - pointDiff;
          this.localStorage.setItem('user', this.user).subscribe(() => {});
          this.store.dispatch(new BetAddedSuccessAction(match));
          this.updateBetList(match);
          this.updateAllMatchList(match);
          this.updateUserProfile();
        } else {
          const errorMessage = res['message'];
          const error = new ErrorModel();
          error.code = responseStatus;
          error.message = errorMessage;
          this.store.dispatch(new BetAddedFailedAction(error));
        }
      },
      err => {
        const errorMessage = err['statusText'];
        const error = new ErrorModel();
        error.code = err['status'];
        error.message = errorMessage;
        this.store.dispatch(new BetAddedFailedAction(error));
      }
    );
  }

  updateBetList(match: MatchModel) {
    if (this.addedBets) {
      const filtered = this.addedBets.filter( item => item.id === match.id);
      filtered.forEach(element => {
        element.updatePointsFromCopy(match);
      });
      if (filtered.length === 0) {
        this.addedBets.push(match);
      }
      if (match.totalBets() === 0) {
        const index = this.addedBets.findIndex(item => item.id === match.id);
        this.addedBets.splice(index, 1);
      }
      this.addedBets.sort((a, b) => a.id > b.id ? 1 : 0);
      // let cloned = this.addedBets.map(x => Object.assign({}, x));
      this.store.dispatch(new MatchBetsListedAction(this.addedBets));
    }
  }

  updateAllMatchList(match: MatchModel) {
    const filtered = this.allMatches.filter( item => item.id === match.id);
      filtered.forEach(element => {
        element.updatePointsFromCopy(match);
      });
  }

  deleteAllBetOfMatch(match: MatchModel) {
    const pointDiff = match.totalBets();
    match.clearBets();
    this.addBet(match, -pointDiff);
    // this.user.points = this.user.points + match.totalBets();
    // this.localStorage.setItem('user', this.user).subscribe(() => {});
    // const filtered = this.allMatches.filter( item => item.id === match.id);
    // filtered.forEach(element => {
    //   element.clearBets();
    // });
    // const index = this.addedBets.findIndex(item => item.id === match.id);
    // this.addedBets.splice(index, 1);
    // this.store.dispatch(new MatchBetsListedAction(this.addedBets));
  }
}
