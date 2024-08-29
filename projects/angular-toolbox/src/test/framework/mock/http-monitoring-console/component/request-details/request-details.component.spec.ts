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
import { buildHttpMockLoggingMetadata, buildLog, DATA, URL_STRING } from '../../test-util/http-monitoring-test-util';
import { EMPTY_STRING, Log, LogBuilder, LogLevel } from 'projects/angular-toolbox/src/public-api';
import { AtxConsoleActionType } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-console-action-type';
import { By } from '@angular/platform-browser';

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
  let log: Log;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxRequestDetailsComponent],
      providers: [AtxUserActionService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AtxRequestDetailsComponent);
    component = fixture.componentInstance;
    log = buildLog();
    component.log = log;
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
  
  it('AtxRequesInfoComponent should be displayed by default', () => {
    const nativeElement = fixture.nativeElement;
    const main = nativeElement.querySelector('main');
    expect(main.children.length).toEqual(1);
    expect(main.querySelector('atx-request-info-renderer')).toBeTruthy();
  });

  it('Clicking the Preview menu item should display the AtxResponsePreviewRendererComponent component', () => {
    const nativeElement = fixture.nativeElement;
    const main = nativeElement.querySelector('main');
    const liList = nativeElement.querySelectorAll('li');
    const elm = liList[1];
    expect(elm.firstChild.textContent.includes("Preview")).toBeTrue();
    elm.click();
    fixture.detectChanges();
    expect(main.querySelector('atx-response-preview-renderer')).toBeTruthy();
  });

  it('Clicking the Response menu item should display the AtxResponseBodyRendererComponent component', () => {
    const nativeElement = fixture.nativeElement;
    const main = nativeElement.querySelector('main');
    const liList = nativeElement.querySelectorAll('li');
    const elm = liList[2];
    expect(elm.firstChild.textContent.includes("Response")).toBeTrue();
    elm.click();
    fixture.detectChanges();
    expect(main.querySelector('atx-response-body-renderer')).toBeTruthy();
  });

  it('Clicking the Timing menu item should display the AtxTimingRendererComponent component', () => {
    const nativeElement = fixture.nativeElement;
    const main = nativeElement.querySelector('main');
    const liList = nativeElement.querySelectorAll('li');
    const elm = liList[3];
    expect(elm.firstChild.textContent.includes("Timing")).toBeTrue();
    elm.click();
    fixture.detectChanges();
    expect(main.querySelector('atx-timing-renderer')).toBeTruthy();
  });

  it('Clicking the Headers menu item should display the AtxRequesInfoComponent component', async () => {
    const nativeElement = fixture.nativeElement;
    const main = nativeElement.querySelector('main');
    const liList = nativeElement.querySelectorAll('li');
    let elm = liList[3];
    elm.click();
    fixture.detectChanges();
    await fixture.whenStable();
    elm = liList[0];
    expect(elm.firstChild.textContent.includes("Headers")).toBeTrue();
    elm.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(main.querySelector('atx-request-info-renderer')).toBeTruthy();
  });
  
  it('clicking the last menu item should invoke the AtxUserActionService.sendAction() method with AtxConsoleActionType.CLOSE_DETAILS_PANEL', () => {
    const service = fixture.debugElement.injector.get(AtxUserActionService);
    const menu = fixture.nativeElement.querySelector('menu');
    spyOn(service, "sendAction");
    menu.lastChild.click();
    expect(service.sendAction).toHaveBeenCalledOnceWith(AtxConsoleActionType.CLOSE_DETAILS_PANEL);
  });

  it('AtxRequesInfoComponent log property should be set by the parent component', () => {
    const detailsComponent = fixture.debugElement.query(By.css("atx-request-info-renderer"));
    // Test introspection bug because of the use of a class factorisation: log is undefined while currLog is protected!
    //expect(detailsComponent.componentInstance.log).toBe(service.selectedLog);
    expect(detailsComponent.componentInstance.currLog).toBe(log);
  });

  it('AtxResponsePreviewRendererComponent log property should be set by the parent component', () => {
    const liList = fixture.nativeElement.querySelectorAll('li');
    const elm = liList[1];
    elm.click();
    fixture.detectChanges();
    const detailsComponent = fixture.debugElement.query(By.css("atx-response-preview-renderer"));
    // Test introspection bug because of the use of a class factorisation: log is undefined while currLog is protected!
    //expect(detailsComponent.componentInstance.log).toBe(service.selectedLog);
    expect(detailsComponent.componentInstance.currLog).toBe(log);
  });

  it('AtxResponseBodyRendererComponent log property should be set by the parent component', () => {
    const liList = fixture.nativeElement.querySelectorAll('li');
    const elm = liList[2];
    elm.click();
    fixture.detectChanges();
    const detailsComponent = fixture.debugElement.query(By.css("atx-response-body-renderer"));
    // Test introspection bug because of the use of a class factorisation: log is undefined while currLog is protected!
    //expect(detailsComponent.componentInstance.log).toBe(service.selectedLog);
    expect(detailsComponent.componentInstance.currLog).toBe(log);
  });

  it('AtxTimingRendererComponent log property should be set by the parent component', () => {
    const liList = fixture.nativeElement.querySelectorAll('li');
    const elm = liList[3];
    elm.click();
    fixture.detectChanges();
    const detailsComponent = fixture.debugElement.query(By.css("atx-timing-renderer"));
    // Test introspection bug because of the use of a class factorisation: log is undefined while currLog is protected!
    //expect(detailsComponent.componentInstance.log).toBe(service.selectedLog);
    expect(detailsComponent.componentInstance.currLog).toBe(log);
  });
  
  it('AtxRequesInfoComponent log property should be set by the parent component', () => {
    const detailsComponent = fixture.debugElement.query(By.css("atx-request-info-renderer"));
    // Test introspection bug because of the use of a class factorisation: log is undefined while currLog is protected!
    //expect(detailsComponent.componentInstance.log).toBe(service.selectedLog);
    expect(detailsComponent.componentInstance.currLog).toBe(log);
  });
});

describe('AtxRequestDetailsComponent: log has payload', () => {
  let component: AtxRequestDetailsComponent;
  let fixture: ComponentFixture<AtxRequestDetailsComponent>;
  let log: Log;
  
  const buildLog = ()=> {
    const metadata =  {
      request: new HttpRequest("POST", URL_STRING, DATA),
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
    log = buildLog();
    component.log = log;
    fixture.detectChanges();
  });

  it('Payload menu item should be available', () => {
    const liList = fixture.nativeElement.querySelectorAll('li');
    expect(liList[1].firstChild.textContent.includes("Payload")).toBeTrue();
  });

  it('Clicking the payload menu item should display the AtxPayloadRendererComponent component', () => {
    const nativeElement = fixture.nativeElement;
    const main = nativeElement.querySelector('main');
    const liList = nativeElement.querySelectorAll('li');
    const elm = liList[1];
    elm.click();
    fixture.detectChanges();
    expect(main.querySelector('atx-payload-renderer')).toBeTruthy();
  });
  
  it('AtxPayloadRendererComponent log property should be set by the parent component', () => {
    const liList = fixture.nativeElement.querySelectorAll('li');
    const elm = liList[1];
    elm.click();
    fixture.detectChanges();
    const detailsComponent = fixture.debugElement.query(By.css("atx-payload-renderer"));
    // Test introspection bug because of the use of a class factorisation: log is undefined while currLog is protected!
    //expect(detailsComponent.componentInstance.log).toBe(service.selectedLog);
    expect(detailsComponent.componentInstance.currLog).toBe(log);
  });
});
