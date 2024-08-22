/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxPayloadRendererComponent } from './payload-renderer.component';

describe('AtxPayloadRendererComponent', () => {
  let component: AtxPayloadRendererComponent;
  let fixture: ComponentFixture<AtxPayloadRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxPayloadRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxPayloadRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
