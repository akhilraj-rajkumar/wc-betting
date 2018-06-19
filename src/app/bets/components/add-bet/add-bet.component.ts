import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AddBetService } from '../../services/add-bet.service';
import { IAppState, getBetSuccess, getBetFailed, getLoggedInUser, getMatchAllBets } from '@app/reducers';
import { MatchModel, ErrorModel, UserModel, BetModel } from '@app/models';
import { BetAddedFailedAction } from '@app/actions';
import { tassign } from 'tassign';
import { MatchBetsService } from '../../services/match-bets.service';

declare var $: any;

@Component({
  selector: 'app-add-bet',
  templateUrl: './add-bet.component.html',
  styleUrls: ['./add-bet.component.css']
})
export class AddBetComponent implements OnInit, OnDestroy, OnChanges {

  @Input() match: MatchModel;
  @Output() closePopup = new EventEmitter();

  public loading = false;
  isSubmitted = false;
  public pointsLeft = 0;

  homeBetOdd = 0;
  awayBetOdd = 0;
  drawBetOdd = 0;

  matchBetsStore: Observable<BetModel>;
  betSuccessStore: Observable<MatchModel>;
  betFailureStore: Observable<ErrorModel>;
  userStore: Observable<UserModel>;
  user: UserModel;
  private subscription: Subscription = new Subscription();
  matchCopy: MatchModel;
  matchBet: BetModel = new BetModel();
  matchBetOriginal: BetModel = new BetModel();

  constructor(
    private store: Store<IAppState>,
    private betService: AddBetService,
    private matchBetsService: MatchBetsService
  ) {
    this.betSuccessStore = this.store.select(getBetSuccess);
    this.subscription.add(this.betSuccessStore.subscribe(state => {
      if (state && this.isSubmitted) {
        this.match.updatePointsFromCopy(state);
        // this.user.points = this.user.points - this.match.totalBets();
        this.hideModal();
        this.showNotification('Your bet added Successfully', 'success');
      }
      this.loading = false;
    }));
    this.betFailureStore = this.store.select(getBetFailed);
    this.subscription.add(this.betFailureStore.subscribe(state => {
      if (state.message && this.isSubmitted) {
        this.showNotification(state.message, 'danger');
        this.isSubmitted = false;
      }
      this.loading = false;
    }));
    this.userStore = this.store.select(getLoggedInUser);
    this.subscription.add(this.userStore.subscribe(state => {
      this.user = state;
      this.pointsLeft = this.user.points;
    }));
    this.matchBetsStore = this.store.select(getMatchAllBets);
    this.subscription.add(this.matchBetsStore.subscribe(state => {
      if (state) {
        this.matchBetOriginal = state;
        this.matchBet = Object.assign(new BetModel(), this.matchBetOriginal);
        this.updateBetOdds();
      }
    }));
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.matchCopy = Object.assign(new MatchModel(), changes.match.currentValue);
    if (this.matchCopy) {
      this.matchBetsService.getDetailsOfMatch(this.matchCopy);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateBetOdds() {

    if (this.match !== undefined && this.matchCopy !== undefined) {
      const total = this.matchBet.totalBets();
      if (this.matchBet.homeBets > 0) {
        const homeBetShare = total / this.matchBet.homeBets;
        this.homeBetOdd = homeBetShare * this.matchCopy.homeTeamBets;
      } else {
        this.homeBetOdd = 0;
      }
  
      if (this.matchBet.awayBets > 0) {
        const awayBetShare = total / this.matchBet.awayBets;
        this.awayBetOdd = awayBetShare * this.matchCopy.awayTemaBets;
      } else {
        this.awayBetOdd = 0;
      }
      
      if (this.matchBet.drawBets > 0) {
        const drawBetShare = total / this.matchBet.drawBets;
        this.drawBetOdd = drawBetShare * this.matchCopy.drawBets;
      } else {
        this.drawBetOdd = 0;
      }
    }
  }

  updateUserPoints() {
    const diff = this.matchCopy.totalBets() - this.match.totalBets();
    this.pointsLeft = this.user.points - diff;
  }

  updateTotalPoints() {
    const homeBetDiff = this.matchCopy.homeTeamBets - this.match.homeTeamBets;
    const awayBetDiff = this.matchCopy.awayTemaBets - this.match.awayTemaBets;
    const drawBetDiff = this.matchCopy.drawBets - this.match.drawBets;

    this.matchBet.homeBets = this.matchBetOriginal.homeBets + homeBetDiff;
    this.matchBet.awayBets = this.matchBetOriginal.awayBets + awayBetDiff;
    this.matchBet.drawBets = this.matchBetOriginal.drawBets + drawBetDiff;
  }

  homeTeamBetCountUpdated(count) {
    this.matchCopy.homeTeamBets = count;
    this.updateUserPoints();
    this.updateTotalPoints();
    this.updateBetOdds();
  }

  awayTeamBetCountUpdated(count) {
    this.matchCopy.awayTemaBets = count;
    this.updateUserPoints();
    this.updateTotalPoints();
    this.updateBetOdds();
  }

  drawBetCountUpdated(count) {
    this.matchCopy.drawBets = count;
    this.updateUserPoints();
    this.updateTotalPoints();
    this.updateBetOdds();
  }

  hideModal() {
    this.closePopup.emit();
  }

  submit() {
    if (this.validate()) {
      this.loading = true;
      this.isSubmitted = true;
      const diff = this.matchCopy.totalBets() - this.match.totalBets();
      this.betService.addBet(this.matchCopy, diff);
    }
  }

  validate(): boolean {
    if (this.matchCopy.homeTeamBets === 0 && 
        this.matchCopy.awayTemaBets === 0 && 
        this.matchCopy.drawBets === 0) {
          this.showNotification('Please add atlease one bet to submit!', 'warning')
          return false;
    }
    const diff = this.matchCopy.totalBets() - this.match.totalBets();
    if (diff > this.user.points) {
      // this.showNotification('You cannot bet more than your credit limit!', 'danger')
      // return false;
      return true;
    }
    return true;
  }

  showNotification(message, type) {
    // const type = ['','info','success','warning','danger'];

    // const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: message

    }, {
        type: type,
        timer: 2000,
        placement: {
            from: 'top',
            align: 'right'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
}
