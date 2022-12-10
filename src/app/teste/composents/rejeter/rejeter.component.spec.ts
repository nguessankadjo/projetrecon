/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RejeterComponent } from './rejeter.component';

describe('RejeterComponent', () => {
  let component: RejeterComponent;
  let fixture: ComponentFixture<RejeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
