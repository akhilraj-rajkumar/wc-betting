import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ngx-owl-carousel';
import { LoadingModule } from 'ngx-loading';

import { BetsRoutingModule } from './bets-routing.module';
import { BetResultsComponent } from './components/bet-results/bet-results.component';
import { FutureBetsComponent } from './components/future-bets/future-bets.component';
import { AddBetComponent } from './components/add-bet/add-bet.component';
import { BetOptionComponent } from './components/bet-option/bet-option.component';
import { AddBetService } from './services/add-bet.service';

import { CoreModule } from '@app/core';

@NgModule({
  imports: [
    CommonModule,
    BetsRoutingModule,
    CoreModule,
    OwlModule,
    LoadingModule
  ],
  providers: [AddBetService],
  declarations: [BetResultsComponent, FutureBetsComponent, AddBetComponent, BetOptionComponent],
  exports: [BetResultsComponent, FutureBetsComponent, AddBetComponent, BetOptionComponent]
})
export class BetsModule { }
