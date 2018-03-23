import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMediaComponent } from './other-media.component';

describe('OtherMediaComponent', () => {
  let component: OtherMediaComponent;
  let fixture: ComponentFixture<OtherMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
