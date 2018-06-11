import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MatchModel, ErrorModel } from '@app/models';
import { BaseService, SUCCESS_STATUS, FAILURE_STATUS } from '@app/core';
import { BetAddedFailedAction, MatchBetsListedAction } from '@app/actions';
import { getUpcomingMatchesList } from '@app/reducers';

@Injectable({
  providedIn: 'root'
})
export class FutureBetsService extends BaseService {

  matchesStorage: Observable<MatchModel[]>;
  allMatches: MatchModel[] = [];

  fetchAllBets() {
    this.matchesStorage = this.store.select(getUpcomingMatchesList);
    this.subscription.add(this.matchesStorage.subscribe(state => {
      this.allMatches = state;
    }));
    const url = 'users/bids';
    this.getData(url).subscribe(
      res => {
        console.log(res);
        const responseStatus = res['status'];
        if (responseStatus === SUCCESS_STATUS) {
          const futureBetMatchList = [];
          const allBets = res['user_bids_matches'];
          const futureBets = allBets['up_coming'];
          futureBets.forEach(element => {
            const match = element['match'];
            const bids = element['bids'];
            const homeBets = bids['home']['number_of_bids'];
            const awayBets = bids['away']['number_of_bids'];
            const drawBets = bids['draw']['number_of_bids'];
            const filtered = this.allMatches.filter( item => item.id === match.id);
            filtered.forEach(filteredMatch => {
              // filteredMatch.updatePointsFromCopy(match);
              filteredMatch.homeTeamBets = homeBets;
              filteredMatch.awayTemaBets = awayBets;
              filteredMatch.drawBets = drawBets;
              const copy = Object.assign(new MatchModel(), filteredMatch);
              if (copy.totalBets() > 0) {
                futureBetMatchList.push(copy);
              }
            });
            // filtered.forEach(matchObj => {
            //   const copy = Object.assign(new MatchModel(), matchObj);
            //   futureBetMatchList.push(copy);
            // });
          });
          futureBetMatchList.sort((a, b) => a.id > b.id ? 1 : 0);
          this.store.dispatch(new MatchBetsListedAction(futureBetMatchList));
        } else {
          const errorMessage = res['message'];
          const error = new ErrorModel();
          error.code = responseStatus;
          error.message = errorMessage;
          this.store.dispatch(new BetAddedFailedAction(error));
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
