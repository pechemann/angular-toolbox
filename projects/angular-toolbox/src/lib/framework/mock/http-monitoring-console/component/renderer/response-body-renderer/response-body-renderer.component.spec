/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxResponseBodyRendererComponent } from './response-body-renderer.component';

describe('AtxResponseBodyRendererComponent', () => {
  let component: AtxResponseBodyRendererComponent;
  let fixture: ComponentFixture<AtxResponseBodyRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxResponseBodyRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxResponseBodyRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
