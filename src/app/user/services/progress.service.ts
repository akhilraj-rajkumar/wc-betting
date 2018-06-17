import { Injectable } from '@angular/core';

import { BaseService, SUCCESS_STATUS, FAILURE_STATUS } from '@app/core';
import { UserProgressModel } from '@app/models';
import { UserProgressLoadedAction } from '@app/actions';

@Injectable({
  providedIn: 'root'
})
export class ProgressService extends BaseService {

  public fetchUSerProgress() {
    const url = 'users/progress';
    this.getData(url).subscribe(
      res => {
        const responseStatus = res['status'];
        if (responseStatus === SUCCESS_STATUS) {
          const progressResp = res['progress'];
          const progress = [];
          progressResp.forEach(element => {
            const item = new UserProgressModel().deserialize(element);
            progress.push(item);
          });
          this.store.dispatch(new UserProgressLoadedAction(progress));
        }
      },
      err => {

      }
    );
  }
}
