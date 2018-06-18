import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as Chartist from 'chartist';

import { IAppState, getLoggedInUser, getUserPorgress } from '@app/reducers';
import { UserModel, UserProgressModel } from '@app/models';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userStore: Observable<UserModel>;
  user: UserModel;

  userProgrssStor: Observable<UserProgressModel[]>;
  userProgress: UserProgressModel[];
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<IAppState>,
    private progressService: ProgressService) {
    this.userStore = this.store.select(getLoggedInUser);
      this.subscription.add(this.userStore.subscribe(state => {
        this.user = state;
      }));

    this.userProgrssStor = this.store.select(getUserPorgress);
    this.subscription.add(this.userProgrssStor.subscribe(state => {
      this.userProgress = state;
      this.loadProgressChart();
    }));
  }

  ngOnInit() {
    this.loadChart();
    this.progressService.fetchUSerProgress();
  }

  loadProgressChart() {
    if (this.userProgress.length > 0) {
      const matchIds = this.userProgress.map( o => {
        return o.match;
      });
      const points = this.userProgress.map( o => {
        return o.netPoint;
      });
      let min = Math.min(...points);
      let max = Math.max(...points);
      min = min - 1;
      max = max + 1;
      const dataDailySalesChart: any = {
        labels: matchIds,
        series: [
          points
        ]
        // series: [
        //     [12, 17, 7, 17, 23, 18, 38]
        // ]
      };
      const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: min,
        high: max, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    };

    const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
    this.startAnimationForLineChart(dailySalesChart);
    } else {
      this.loadChart();
    }

  }

  loadChart() {
    const result = [];
    for (let i = 10; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const datePipe = new DatePipe('en-US');
        const date = datePipe.transform(d, 'dd/MM');
        result.push( date );
    }
    const dataDailySalesChart: any = {
      labels: [1, 2, 3, 4, 5, 6, 7],
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
