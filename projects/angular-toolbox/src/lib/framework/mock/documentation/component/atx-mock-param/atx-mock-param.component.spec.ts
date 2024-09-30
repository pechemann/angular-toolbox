/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockParamComponent } from './atx-mock-param.component';

describe('AtxMockParamaComponent', () => {
  let component: AtxMockParamComponent;
  let fixture: ComponentFixture<AtxMockParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMockParamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMockParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
