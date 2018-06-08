import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureBetsComponent } from './future-bets.component';

describe('FutureBetsComponent', () => {
  let component: FutureBetsComponent;
  let fixture: ComponentFixture<FutureBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
