import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ngx-owl-carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

import { MatchModule } from '@app/match';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    OwlModule,
    MatchModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
