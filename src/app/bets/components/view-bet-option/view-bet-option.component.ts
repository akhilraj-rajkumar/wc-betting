import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-bet-option',
  templateUrl: './view-bet-option.component.html',
  styleUrls: ['./view-bet-option.component.css']
})
export class ViewBetOptionComponent implements OnInit {

  @Input() optionName: any;
  @Input() count: number;
  @Input() totalBets: number;

  constructor() { }

  ngOnInit() {
  }

}
