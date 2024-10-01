/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockDocumentation } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-documentation/atx-mock-documentation.component';

describe('AtxMockDocumentationComponent', () => {
  let component: AtxMockDocumentation;
  let fixture: ComponentFixture<AtxMockDocumentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMockDocumentation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMockDocumentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });
});
