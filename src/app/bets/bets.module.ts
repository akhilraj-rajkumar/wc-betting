import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetsRoutingModule } from './bets-routing.module';
import { BetResultsComponent } from './components/bet-results/bet-results.component';
import { FutureBetsComponent } from './components/future-bets/future-bets.component';

import { CoreModule } from '@app/core';

@NgModule({
  imports: [
    CommonModule,
    BetsRoutingModule,
    CoreModule
  ],
  declarations: [BetResultsComponent, FutureBetsComponent],
  exports: [BetResultsComponent, FutureBetsComponent]
})
export class BetsModule { }
