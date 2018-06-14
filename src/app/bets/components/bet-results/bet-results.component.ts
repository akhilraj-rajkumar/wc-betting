import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAppState, getCompletedMatchesBetList } from '@app/reducers';
import { MatchModel } from '@app/models';

@Component({
  selector: 'app-bet-results',
  templateUrl: './bet-results.component.html',
  styleUrls: ['./bet-results.component.css']
})
export class BetResultsComponent implements OnInit, OnDestroy {

  selectedMatch: MatchModel;
  modalRef: BsModalRef;

  private subscription: Subscription = new Subscription();
  addedBets: MatchModel[] = [];
  betsStore: Observable<MatchModel[]>;

  constructor(private store: Store<IAppState>,
    private modalService: BsModalService) {
      this.betsStore = this.store.select(getCompletedMatchesBetList);
      this.subscription.add(this.betsStore.subscribe(state => {
        this.addedBets = state;
        // this.addedBets = this.addedBets.filter(item => item.totalBets() > 0)
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

  isNumber(o): boolean {
    return o !== '-';
  }
}
