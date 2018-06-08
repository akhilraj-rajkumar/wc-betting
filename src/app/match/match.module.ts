import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ngx-owl-carousel';
import { LoadingModule } from 'ngx-loading';

import { CoreModule } from '@app/core';
import { BetsModule } from '@app/bets';

import { MatchRoutingModule } from './match-routing.module';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchListService } from './services/match-list.service';

@NgModule({
  imports: [
    CommonModule,
    MatchRoutingModule,
    OwlModule,
    CoreModule,
    LoadingModule,
    BetsModule
  ],
  providers: [MatchListService],
  declarations: [MatchListComponent],
  exports: [MatchListComponent]
})
export class MatchModule { }
