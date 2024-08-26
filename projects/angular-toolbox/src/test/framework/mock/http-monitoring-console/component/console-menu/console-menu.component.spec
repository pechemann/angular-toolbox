/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxConsoleMenuComponent } from './console-menu.component';

describe('ConsoleMenuComponent', () => {
  let component: AtxConsoleMenuComponent;
  let fixture: ComponentFixture<AtxConsoleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxConsoleMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxConsoleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
