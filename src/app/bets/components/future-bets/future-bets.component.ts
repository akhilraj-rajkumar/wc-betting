import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { IAppState, getBetSuccess, getBetMatchesList } from '@app/reducers';
import { MatchModel } from '@app/models';
import { AddBetService } from '../../services/add-bet.service';

@Component({
  selector: 'app-future-bets',
  templateUrl: './future-bets.component.html',
  styleUrls: ['./future-bets.component.css']
})
export class FutureBetsComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  addedBets: MatchModel[] = [];
  betsStore: Observable<MatchModel[]>;

  selectedMatch: MatchModel;
  modalRef: BsModalRef;

  constructor(private store: Store<IAppState>,
    private modalService: BsModalService,
    private betService: AddBetService) {
    this.betsStore = this.store.select(getBetMatchesList);
    this.subscription.add(this.betsStore.subscribe(state => {
        this.addedBets = state;
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

  deleteBetOfMatch(match: MatchModel) {
    this.betService.deleteAllBetOfMatch(match);
  }
}
