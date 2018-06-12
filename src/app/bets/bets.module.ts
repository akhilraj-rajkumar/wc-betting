import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ngx-owl-carousel';
import { LoadingModule } from 'ngx-loading';
import { TooltipModule } from 'ngx-bootstrap';

import { BetsRoutingModule } from './bets-routing.module';
import { BetResultsComponent } from './components/bet-results/bet-results.component';
import { FutureBetsComponent } from './components/future-bets/future-bets.component';
import { AddBetComponent } from './components/add-bet/add-bet.component';
import { BetOptionComponent } from './components/bet-option/bet-option.component';
import { AddBetService } from './services/add-bet.service';
import { FutureBetsService } from './services/future-bets.service';
import { MatchBetsService } from './services/match-bets.service';

import { CoreModule } from '@app/core';
import { ViewBetComponent } from './components/view-bet/view-bet.component';
import { ViewBetOptionComponent } from './components/view-bet-option/view-bet-option.component';
import { AddControlComponent } from './components/add-control/add-control.component';

@NgModule({
  imports: [
    CommonModule,
    BetsRoutingModule,
    CoreModule,
    OwlModule,
    LoadingModule,
    TooltipModule.forRoot()
  ],
  providers: [AddBetService, FutureBetsService, MatchBetsService],
  declarations: [BetResultsComponent, FutureBetsComponent, AddBetComponent, BetOptionComponent, ViewBetComponent, ViewBetOptionComponent, AddControlComponent],
  exports: [BetResultsComponent, FutureBetsComponent, AddBetComponent, BetOptionComponent]
})
export class BetsModule { }
