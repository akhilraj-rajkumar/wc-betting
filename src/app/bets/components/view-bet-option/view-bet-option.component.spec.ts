import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBetOptionComponent } from './view-bet-option.component';

describe('ViewBetOptionComponent', () => {
  let component: ViewBetOptionComponent;
  let fixture: ComponentFixture<ViewBetOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBetOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBetOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
