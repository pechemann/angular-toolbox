/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxJsonViewerComponent } from './json-viewer.component';

describe('JsonViewerComponent', () => {
  let component: AtxJsonViewerComponent;
  let fixture: ComponentFixture<AtxJsonViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxJsonViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxJsonViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
