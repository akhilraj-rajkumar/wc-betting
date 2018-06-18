import { Injectable } from '@angular/core';

import { MatchModel, ErrorModel, BetModel } from '@app/models';
import { BaseService, SUCCESS_STATUS, FAILURE_STATUS } from '@app/core';
import { MatchAllBetsLoadedAction } from '@app/actions';

@Injectable({
  providedIn: 'root'
})
export class MatchBetsService extends BaseService {

  getDetailsOfMatch(match: MatchModel) {
    const url = 'match/match_details?match_id=' + match.id
    this.getData(url).subscribe(
      res => {
        // console.log(res);
        const responseStatus = res['status'];
        if (responseStatus === SUCCESS_STATUS) {
          const data = res['match_details'];
          const bet = new BetModel().deserialize(data);
          this.store.dispatch(new MatchAllBetsLoadedAction(bet));
        }
      },
      err => {

      }
    );
  }
}
