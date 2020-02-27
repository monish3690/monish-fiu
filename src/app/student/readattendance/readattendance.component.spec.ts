import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadattendanceComponent } from './readattendance.component';

describe('ReadattendanceComponent', () => {
  let component: ReadattendanceComponent;
  let fixture: ComponentFixture<ReadattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
