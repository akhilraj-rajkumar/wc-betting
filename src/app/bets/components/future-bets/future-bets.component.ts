import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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

  selectedMatch: MatchModel;
  modalRef: BsModalRef;

  constructor(private store: Store<IAppState>,
    private modalService: BsModalService) {
    this.betSuccessStore = this.store.select(getBetSuccess);
    this.subscription.add(this.betSuccessStore.subscribe(state => {
      if (state) {
        const filtered = this.allMatches.filter( item => item.id === state.id);
        filtered.forEach(element => {
          element.updatePointsFromCopy(state);
        });
        if (filtered.length === 0) {
          this.allMatches.push(state);
        }
        this.allMatches.sort((a, b) => a.id > b.id ? 1 : 0);
      }
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openModal(template: TemplateRef<any>, match: MatchModel) {
    this.selectedMatch = match;
    this.modalService.config = {
      backdrop: true
    };
    this.modalRef = this.modalService.show(template);
  }

  closeModalPopup() {
    this.modalRef.hide();
  }
}
