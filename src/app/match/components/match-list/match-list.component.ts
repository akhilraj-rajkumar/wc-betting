import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { tassign } from 'tassign';

import { IAppState, getLoggedInUser, getUpcomingMatchesList } from '@app/reducers';
import { MatchBetsListedAction } from '@app/actions';
import { UserModel, MatchModel } from '@app/models';

import { MatchListService } from '../../services/match-list.service';

declare var $: any;

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit, OnDestroy {

  userStore: Observable<UserModel>;
  user: UserModel;

  matchesStorage: Observable<MatchModel[]>;
  allMatches: MatchModel[] = [];
  selectedMatch: MatchModel;

  images: any = [1, 2, 3, 4, 5, 6];
  private subscription: Subscription = new Subscription();

  modalRef: BsModalRef;

  constructor(
    private store: Store<IAppState>,
    private matchesService: MatchListService,
    private modalService: BsModalService
  ) {
    this.userStore = this.store.select(getLoggedInUser);
    this.subscription.add(this.userStore.subscribe(state => {
      this.user = state;
      // this.matchesService.fetchUpComingMatches();
    }));
    this.matchesStorage = this.store.select(getUpcomingMatchesList);
    this.subscription.add(this.matchesStorage.subscribe(state => {
      this.allMatches = state;
    }));
  }

  ngOnInit() {
    this.matchesService.fetchUpComingMatches();
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
