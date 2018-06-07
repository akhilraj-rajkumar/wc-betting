import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ngx-owl-carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    OwlModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
