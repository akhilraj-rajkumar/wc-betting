import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ngx-owl-carousel';

import { CoreModule } from '@app/core';

import { MatchRoutingModule } from './match-routing.module';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchListService } from './services/match-list.service';

@NgModule({
  imports: [
    CommonModule,
    MatchRoutingModule,
    OwlModule,
    CoreModule
  ],
  providers: [MatchListService],
  declarations: [MatchListComponent],
  exports: [MatchListComponent]
})
export class MatchModule { }
