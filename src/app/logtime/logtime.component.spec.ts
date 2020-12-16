import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogtimeComponent } from './logtime.component';

describe('LogtimeComponent', () => {
  let component: LogtimeComponent;
  let fixture: ComponentFixture<LogtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
