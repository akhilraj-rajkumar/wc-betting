import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetResultsComponent } from './bet-results.component';

describe('BetResultsComponent', () => {
  let component: BetResultsComponent;
  let fixture: ComponentFixture<BetResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
