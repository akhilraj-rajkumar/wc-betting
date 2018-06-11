import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bet-option',
  templateUrl: './bet-option.component.html',
  styleUrls: ['./bet-option.component.css']
})
export class BetOptionComponent implements OnInit {

  @Input() optionName: any;
  @Output() valueChange = new EventEmitter();
  @Input() count: number;
  @Input() maxCount: number;

  constructor() {
    this.count = 0;
  }

  ngOnInit() {
  }

  increment() {
    if (this.maxCount > 0) {
      this.count = this.count + 1;
      this.valueChange.emit(this.count);
    }
  }

  descrement() {
    if (this.count > 0) {
      this.count = this.count - 1;
      this.valueChange.emit(this.count);
    }
  }
}
