import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettersViewComponent } from './betters-view.component';

describe('BettersViewComponent', () => {
  let component: BettersViewComponent;
  let fixture: ComponentFixture<BettersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
