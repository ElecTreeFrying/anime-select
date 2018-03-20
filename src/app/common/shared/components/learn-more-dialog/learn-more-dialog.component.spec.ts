import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMoreDialogComponent } from './learn-more-dialog.component';

describe('LearnMoreDialogComponent', () => {
  let component: LearnMoreDialogComponent;
  let fixture: ComponentFixture<LearnMoreDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnMoreDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnMoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
