/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpLoggingConsoleComponent } from './http-logging-console.component';

describe('HttpLoggingConsoleComponent', () => {
  let component: HttpLoggingConsoleComponent;
  let fixture: ComponentFixture<HttpLoggingConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpLoggingConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpLoggingConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
