import { Injectable } from '@angular/core';

import { BaseService, SUCCESS_STATUS, FAILURE_STATUS } from '@app/core';
import { MatchesListedAction } from '@app/actions';
import { MatchModel } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class MatchListService extends BaseService {

  // /match/matches/upcoming

  public fetchUpComingMatches() {
    const url = 'match/matches/upcoming';
    this.getData(url).subscribe(
      res => {
        const responseStatus = res['status'];
        if (responseStatus === SUCCESS_STATUS) {
          const data = res['upcoming_matches'];
          const upcomingMatches = [];
          data.forEach(element => {
            const match = new MatchModel().deserialize(element);
            upcomingMatches.push(match);
          });
          this.store.dispatch(new MatchesListedAction(upcomingMatches));
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
