import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ngx-owl-carousel';

import { CoreModule } from '@app/core';

import { MatchRoutingModule } from './match-routing.module';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchListService } from './services/match-list.service';
import { AddBetComponent } from './components/add-bet/add-bet.component';

@NgModule({
  imports: [
    CommonModule,
    MatchRoutingModule,
    OwlModule,
    CoreModule
  ],
  providers: [MatchListService],
  declarations: [MatchListComponent, AddBetComponent],
  exports: [MatchListComponent]
})
export class MatchModule { }
