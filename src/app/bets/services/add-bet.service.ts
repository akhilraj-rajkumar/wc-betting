import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService, SUCCESS_STATUS, FAILURE_STATUS } from '@app/core';
import { MatchModel, ErrorModel } from '@app/models';
import { BetAddedSuccessAction, BetAddedFailedAction, MatchBetsListedAction } from '@app/actions';
import { getBetMatchesList } from '@app/reducers';

@Injectable({
  providedIn: 'root'
})
export class AddBetService extends BaseService {

  addedBets: MatchModel[] = [];
  betsStore: Observable<MatchModel[]>;

  addBet(match: MatchModel, pointDiff: number) {
    this.betsStore = this.store.select(getBetMatchesList);
    this.subscription.add(this.betsStore.subscribe(state => {
        this.addedBets = state;
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
          if (this.addedBets) {
            const filtered = this.addedBets.filter( item => item.id === match.id);
            filtered.forEach(element => {
              element.updatePointsFromCopy(match);
            });
            if (filtered.length === 0) {
              this.addedBets.push(match);
            }
            this.addedBets.sort((a, b) => a.id > b.id ? 1 : 0);
            // let cloned = this.addedBets.map(x => Object.assign({}, x));
            this.store.dispatch(new MatchBetsListedAction(this.addedBets));
          }
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

  deleteAllBetOfMatch(match: MatchModel) {
    this.user.points = this.user.points + match.totalBets();
    this.localStorage.setItem('user', this.user).subscribe(() => {});
    const index = this.addedBets.findIndex(item => item.id === match.id);
    this.addedBets.splice(index, 1);
    this.store.dispatch(new MatchBetsListedAction(this.addedBets));
  }
}
