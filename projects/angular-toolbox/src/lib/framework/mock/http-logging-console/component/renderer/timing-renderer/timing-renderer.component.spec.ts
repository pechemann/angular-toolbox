/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxTimingRendererComponent } from './timing-renderer.component';

describe('TimingRendererComponent', () => {
  let component: AtxTimingRendererComponent;
  let fixture: ComponentFixture<AtxTimingRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxTimingRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxTimingRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
