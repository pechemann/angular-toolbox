/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxResponsePreviewRendererComponent } from './response-preview-renderer.component';

describe('AtxResponsePreviewRendererComponent', () => {
  let component: AtxResponsePreviewRendererComponent;
  let fixture: ComponentFixture<AtxResponsePreviewRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxResponsePreviewRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxResponsePreviewRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
