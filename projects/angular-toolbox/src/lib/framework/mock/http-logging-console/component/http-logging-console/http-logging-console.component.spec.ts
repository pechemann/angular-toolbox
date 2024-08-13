/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxLoggingConsoleComponent } from './http-logging-console.component';

describe('HttpLoggingConsoleComponent', () => {
  let component: AtxLoggingConsoleComponent;
  let fixture: ComponentFixture<AtxLoggingConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxLoggingConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxLoggingConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
