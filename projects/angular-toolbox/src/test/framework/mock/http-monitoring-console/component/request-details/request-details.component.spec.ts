/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxRequestDetailsComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/request-details/request-details.component';
import { AtxUserActionService } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-user-action.service';
import { buildHttpMockLoggingMetadata, DATA, URL_STRING } from '../../test-util/http-monitoring-test-util';
import { EMPTY_STRING, LogBuilder, LogLevel } from 'projects/angular-toolbox/src/public-api';

describe('AtxRequestDetailsComponent: no log specified', () => {
  let component: AtxRequestDetailsComponent;
  let fixture: ComponentFixture<AtxRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxRequestDetailsComponent],
      providers: [AtxUserActionService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have no UI when the log property is null', () => {
    expect(fixture.nativeElement.children.length).toEqual(0);
  });
});

describe('AtxRequestDetailsComponent: log is specified', () => {
  let component: AtxRequestDetailsComponent;
  let fixture: ComponentFixture<AtxRequestDetailsComponent>;
  
  const buildLog = ()=> {
    const metadata =  {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse(),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    return LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxRequestDetailsComponent],
      providers: [AtxUserActionService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxRequestDetailsComponent);
    component = fixture.componentInstance;
    component.log = buildLog();
    fixture.detectChanges();
  });

  it('should have a header menu', () => {
    const nativeElement = fixture.nativeElement;
    expect(nativeElement.querySelector('header')).toBeTruthy();
    expect(nativeElement.querySelector('menu')).toBeTruthy();
  });

  it('should have a main section', () => {
    const nativeElement = fixture.nativeElement;
    expect(nativeElement.querySelector('main')).toBeTruthy();
  });

  it('first menu section should be selected by default', () => {
    const liList = fixture.nativeElement.querySelectorAll('li');
    let isFirstChild: boolean = true;
    liList.forEach((li: any) => {
        expect(li.firstChild.classList.contains("selected")).toEqual(isFirstChild);
        isFirstChild = false;
    });
  });

  it('Payload menu item should not be available when no payload is provided', () => {
    const liList = fixture.nativeElement.querySelectorAll('li');
    liList.forEach((li: any) => {
      const textContent = li.firstChild.textContent;
      if (textContent) expect(textContent.includes("Payload")).toBeFalse();
    });
  });
});

describe('AtxRequestDetailsComponent: log has payload', () => {
  let component: AtxRequestDetailsComponent;
  let fixture: ComponentFixture<AtxRequestDetailsComponent>;
  
  const buildLog = ()=> {
    const metadata =  {
      request: new HttpRequest("GET", URL_STRING, { body: DATA}),
      response: new HttpResponse(),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    return LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxRequestDetailsComponent],
      providers: [AtxUserActionService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxRequestDetailsComponent);
    component = fixture.componentInstance;
    component.log = buildLog();
    fixture.detectChanges();
  });

  it('Payload menu item should be available', () => {
    const liList = fixture.nativeElement.querySelectorAll('li');
    expect(liList[1].firstChild.textContent.includes("Payload")).toBeFalse();
  });
});
