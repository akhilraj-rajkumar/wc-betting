import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap';

import { CoreModule } from '@app/core';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LeadersService } from './services/leaders.service';
import { ProgressService } from './services/progress.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
    TooltipModule.forRoot()
  ],
  declarations: [ProfileComponent, LeaderboardComponent],
  providers: [LeadersService, ProgressService]
})
export class UserModule { }
