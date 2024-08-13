/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxLogDetailsComponent } from './log-details.component';

describe('LogDetailsComponent', () => {
  let component: AtxLogDetailsComponent;
  let fixture: ComponentFixture<AtxLogDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxLogDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
