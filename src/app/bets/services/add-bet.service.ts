import { Injectable } from '@angular/core';

import { BaseService, SUCCESS_STATUS, FAILURE_STATUS } from '@app/core';
import { MatchModel, ErrorModel } from '@app/models';
import { BetAddedSuccessAction, BetAddedFailedAction } from '@app/actions';

@Injectable({
  providedIn: 'root'
})
export class AddBetService extends BaseService {

  addBet(match: MatchModel) {
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
          this.store.dispatch(new BetAddedSuccessAction(match));
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
}
