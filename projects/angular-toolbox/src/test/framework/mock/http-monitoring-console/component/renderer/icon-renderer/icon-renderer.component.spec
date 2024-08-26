/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxIconRendererComponent } from './icon-renderer.component';

describe('AtxIconRendererComponent', () => {
  let component: AtxIconRendererComponent;
  let fixture: ComponentFixture<AtxIconRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxIconRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxIconRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
