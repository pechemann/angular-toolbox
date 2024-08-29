/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxSpinnerComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/spinner/spinner.component';

describe('AtxSpinnerComponent', () => {
  let component: AtxSpinnerComponent;
  let fixture: ComponentFixture<AtxSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a single SVG icon', () => {
    const nativeElement = fixture.nativeElement;
    expect(nativeElement.children.length).toEqual(1);
    expect(nativeElement.querySelector("svg")).toBeTruthy();
  });
});
