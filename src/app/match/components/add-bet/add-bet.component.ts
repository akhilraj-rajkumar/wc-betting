import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AddBetService } from '../../services/add-bet.service';
import { IAppState, getBetSuccess, getBetFailed } from '@app/reducers';
import { MatchModel, ErrorModel } from '@app/models';
import { BetAddedFailedAction } from '@app/actions';

declare var $: any;

@Component({
  selector: 'app-add-bet',
  templateUrl: './add-bet.component.html',
  styleUrls: ['./add-bet.component.css']
})
export class AddBetComponent implements OnInit {

  @Input() match: MatchModel;
  @Output() closePopup = new EventEmitter();

  public loading = false;
  isSubmitted = false;
  homeTeamBets: number = 0;
  awayTeamBets: number = 0;
  drawBets: number = 0;

  betSuccessStore: Observable<{}>;
  betFailureStore: Observable<ErrorModel>;
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<IAppState>,
    private betService: AddBetService
  ) {
    this.betSuccessStore = this.store.select(getBetSuccess);
    this.subscription.add(this.betSuccessStore.subscribe(state => {
      if (state) {
        this.hideModal();
        this.showNotification('Successfully added your bet', 'success')
      }
    }));
    this.betFailureStore = this.store.select(getBetFailed);
    this.subscription.add(this.betFailureStore.subscribe(state => {
      if (state.message && this.isSubmitted) {
        this.showNotification(state.message, 'danger')
        this.isSubmitted = false;
      }
    }));
  }

  ngOnInit() {
  }

  homeTeamBetCountUpdated(count) {
    this.homeTeamBets = count;
  }

  awayTeamBetCountUpdated(count) {
    this.awayTeamBets = count;
  }

  drawBetCountUpdated(count) {
    this.drawBets = count;
  }

  hideModal() {
    this.closePopup.emit();
  }

  submit() {
    this.loading = true;
    this.isSubmitted = true;
    const options = {
      homeTeam: this.homeTeamBets,
      awayTeam: this.awayTeamBets,
      draw: this.drawBets
    }
    this.betService.addBet(this.match, options);
  }

  showNotification(message, type){
    // const type = ['','info','success','warning','danger'];

    // const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: message

    },{
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
