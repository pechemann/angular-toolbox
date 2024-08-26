/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxConsoleFooterComponent } from './console-footer.component';

describe('ConsoleFooterComponent', () => {
  let component: AtxConsoleFooterComponent;
  let fixture: ComponentFixture<AtxConsoleFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxConsoleFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxConsoleFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
