/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockDescriptionComponent } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-description/atx-mock-description.component';
import { EMPTY_STRING } from 'projects/angular-toolbox/src/public-api';

describe('AtxMockDescriptionComponent', () => {
  let component: AtxMockDescriptionComponent;
  let fixture: ComponentFixture<AtxMockDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMockDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMockDescriptionComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty by default', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.textContent).toEqual(EMPTY_STRING);
  });

  it('should display the specified description', () => {
    component.description = "Lorem ipsum";
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.textContent).toEqual("Lorem ipsum");
  });

  it('should render HTML tags', () => {
    component.description = "<code>Lorem ipsum</code";
    fixture.detectChanges();
    const code: HTMLElement = fixture.nativeElement.querySelector('code');
    expect(code.textContent).toEqual("Lorem ipsum");
  });
});
