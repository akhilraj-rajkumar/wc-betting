import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as Chartist from 'chartist';

import { IAppState, getLoggedInUser } from '@app/reducers';
import { UserModel } from '@app/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userStore: Observable<UserModel>;
  user: UserModel;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<IAppState>) {
    this.userStore = this.store.select(getLoggedInUser);
      this.subscription.add(this.userStore.subscribe(state => {
        this.user = state;
      }));
  }

  ngOnInit() {
    this.loadChart();
  }

  loadChart() {
    var result = [];
    for (var i=6; i>=0; i--) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        var datePipe = new DatePipe("en-US");
        const date = datePipe.transform(d, 'dd/MM');
        result.push( date )
    }
    const dataDailySalesChart: any = {
      labels: result,
      series: [
        [0, 0, 0, 0, 0, 0, 0]
      ]
      // series: [
      //     [12, 17, 7, 17, 23, 18, 38]
      // ]
  };

 const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  };

  const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

  this.startAnimationForLineChart(dailySalesChart);
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
}

}
