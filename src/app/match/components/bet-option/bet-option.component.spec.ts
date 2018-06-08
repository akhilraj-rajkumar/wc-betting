import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetOptionComponent } from './bet-option.component';

describe('BetOptionComponent', () => {
  let component: BetOptionComponent;
  let fixture: ComponentFixture<BetOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
