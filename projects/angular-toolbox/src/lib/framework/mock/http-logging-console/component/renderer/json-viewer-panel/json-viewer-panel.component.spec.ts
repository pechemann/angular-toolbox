/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxJsonViewerPanelComponent } from './json-viewer-panel.component';

describe('JsonViewerComponent', () => {
  let component: AtxJsonViewerPanelComponent;
  let fixture: ComponentFixture<AtxJsonViewerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxJsonViewerPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxJsonViewerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
