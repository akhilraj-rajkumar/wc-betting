import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ngx-owl-carousel';
import { LoadingModule } from 'ngx-loading';

import { CoreModule } from '@app/core';

import { MatchRoutingModule } from './match-routing.module';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchListService } from './services/match-list.service';
import { AddBetComponent } from './components/add-bet/add-bet.component';
import { BetOptionComponent } from './components/bet-option/bet-option.component';
import { AddBetService } from './services/add-bet.service';

@NgModule({
  imports: [
    CommonModule,
    MatchRoutingModule,
    OwlModule,
    CoreModule,
    LoadingModule
  ],
  providers: [MatchListService, AddBetService],
  declarations: [MatchListComponent, AddBetComponent, BetOptionComponent],
  exports: [MatchListComponent]
})
export class MatchModule { }
