import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ngx-owl-carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

import { MatchModule } from '@app/match';
import { BetsModule } from '@app/bets';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    OwlModule,
    MatchModule,
    BetsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
