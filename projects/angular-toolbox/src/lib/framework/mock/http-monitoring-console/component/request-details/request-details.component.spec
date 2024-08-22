/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxRequestDetailsComponent } from './request-details.component';

describe('AtxRequestDetailsComponent', () => {
  let component: AtxRequestDetailsComponent;
  let fixture: ComponentFixture<AtxRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxRequestDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
