/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AtxRequesInfoComponent', () => {
  let component: AtxRequesInfoComponent;
  let fixture: ComponentFixture<AtxRequesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxRequesInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxRequesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
