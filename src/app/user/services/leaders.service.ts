import { Injectable } from '@angular/core';

import { BaseService, SUCCESS_STATUS, FAILURE_STATUS } from '@app/core';
import { LeaderModel } from '@app/models';
import { LeadersLoadedAction } from '@app/actions';

@Injectable({
  providedIn: 'root'
})
export class LeadersService extends BaseService {

  public fetchAllLeaders() {
    const url = 'users/leaders';
    this.getData(url).subscribe(
      res => {
        const responseStatus = res['status'];
        if (responseStatus === SUCCESS_STATUS) {
          const leadersResp = res['leaders'];
          const leaders = [];
          leadersResp.forEach(element => {
            const leader = new LeaderModel().deserialize(element);
            leaders.push(leader);
          });
          this.store.dispatch(new LeadersLoadedAction(leaders));
        }
      },
      err => {

      }
    );
  }
}
