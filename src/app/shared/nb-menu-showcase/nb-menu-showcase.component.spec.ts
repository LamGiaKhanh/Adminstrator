import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbMenuShowcaseComponent } from './nb-menu-showcase.component';

describe('NbMenuShowcaseComponent', () => {
  let component: NbMenuShowcaseComponent;
  let fixture: ComponentFixture<NbMenuShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbMenuShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbMenuShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
