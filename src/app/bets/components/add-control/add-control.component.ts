import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-control',
  templateUrl: './add-control.component.html',
  styleUrls: ['./add-control.component.css']
})
export class AddControlComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  @Input() count: number;
  @Input() maxCount: number;

  constructor() { }

  ngOnInit() {
  }

  increment() {
    if (this.maxCount >= 1) {
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
