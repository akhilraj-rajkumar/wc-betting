import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBetComponent } from './view-bet.component';

describe('ViewBetComponent', () => {
  let component: ViewBetComponent;
  let fixture: ComponentFixture<ViewBetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
