import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bet-option',
  templateUrl: './bet-option.component.html',
  styleUrls: ['./bet-option.component.css']
})
export class BetOptionComponent implements OnInit {

  @Input() optionName: any;
  @Output() valueChange = new EventEmitter();
  count: number;

  constructor() {
    this.count = 0;
  }

  ngOnInit() {
  }

  increment() {
    this.count = this.count + 1;
    this.valueChange.emit(this.count);
  }

  descrement() {
    if (this.count > 0) {
      this.count = this.count - 1;
      this.valueChange.emit(this.count);
    }
  }
}
