import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-betters-view',
  templateUrl: './betters-view.component.html',
  styleUrls: ['./betters-view.component.css']
})
export class BettersViewComponent implements OnInit {

  rows = [1,2,3,4,5,6,7,8,9,10]
  @Input() usersList = [];

  constructor() { }

  ngOnInit() {
  }

}
