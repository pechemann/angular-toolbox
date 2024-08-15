/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMonitoringConsoleComponent } from './http-monitoring-console.component';

describe('HttpLoggingConsoleComponent', () => {
  let component: AtxMonitoringConsoleComponent;
  let fixture: ComponentFixture<AtxMonitoringConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMonitoringConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMonitoringConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
