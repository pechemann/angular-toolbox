/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxRequestListRendererComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/request-list-renderer/request-list-renderer.component';
import { AtxConsoleActionType } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-console-action-type';
import { AtxMonitoringConsoleState } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-monitoring-console.state';
import { AtxUserActionService } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-user-action.service';
import { EMPTY_STRING, LogBuilder, LogLevel, Uuid } from 'projects/angular-toolbox/src/public-api';
import { buildHttpMockLoggingMetadata, URL_OBJ, URL_STRING } from '../../../test-util/http-monitoring-test-util';
import { HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { UrlUtil } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/url.util';

describe('AtxRequestListRendererComponent', () => {
  let component: AtxRequestListRendererComponent;
  let fixture: ComponentFixture<AtxRequestListRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxRequestListRendererComponent],
      providers: [
        AtxMonitoringConsoleState,
        AtxUserActionService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxRequestListRendererComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default UI when no logs are specified', () => {
    fixture.detectChanges();
    const nativeElement = fixture.nativeElement;
    const thList = nativeElement.querySelectorAll('th');
    expect(thList[0].textContent.includes("Name")).toBeTrue();
    expect(thList[1].textContent.includes("Status")).toBeTrue();
    expect(thList[2].textContent.includes("Size")).toBeTrue();
    expect(thList[3].textContent.includes("Time")).toBeTrue();
  });

  it('header button should invoke the AtxUserActionService.sendAction() method when it is clicked', () => {
    const actionSvc = fixture.debugElement.injector.get(AtxUserActionService);
    spyOn(actionSvc, "sendAction");
    const btn = fixture.nativeElement.querySelector('.header-btn');
    btn.click();
    expect(actionSvc.sendAction).toHaveBeenCalledWith(AtxConsoleActionType.CLOSE_DETAILS_PANEL);
  });

  it('tbody should be empty when no logs are specified', () => {
    const tbody = fixture.nativeElement.querySelector('tbody');
    expect(tbody.children.length).toEqual(0);
  });

  it('should add as many rows as logs are specified', () => {
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const tbody = fixture.nativeElement.querySelector('tbody');
    let logNum = 5;
    for(; logNum >= 0; --logNum) {
      stateSvc.addLog(LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, buildHttpMockLoggingMetadata()));
    }
    fixture.detectChanges();
    expect(tbody.children.length).toEqual(6);
  });

  it('should display only the first col when a log is selected', () => {
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, buildHttpMockLoggingMetadata());
    stateSvc.addLog(log);
    stateSvc.selectLog(log);
    fixture.detectChanges();
    const thList = fixture.nativeElement.querySelectorAll('th');
    expect(thList.length).toEqual(1);
    expect(thList[0].textContent.includes("Name")).toBeTrue();
  });

  it('should highlight the selected row when a log is selected', () => {
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, buildHttpMockLoggingMetadata());
    stateSvc.addLog(log);
    stateSvc.selectLog(log);
    fixture.detectChanges();
    const tbody = fixture.nativeElement.querySelector('tbody');
    const row = tbody.querySelector('.selected-row');
    expect(row).toBeTruthy();
  });

  it('should not highlight the row when the associated log is an info', () => {
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, buildHttpMockLoggingMetadata());
    stateSvc.addLog(log);
    fixture.detectChanges();
    const row = fixture.nativeElement.querySelector('.error-row');
    expect(row).toBeNull();
  });

  it('should highlight the row when the associated log is an error', () => {
    const metadata = {
        request: new HttpRequest("GET", URL_STRING),
        response: new HttpResponse({ status: HttpStatusCode.BadRequest }),
        requestMetadata: {
            duration: 260,
            stalled: 964,
            start: 695,
            url: URL_OBJ,
            id: Uuid.build()
        }
    }
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.ERROR, metadata);
    stateSvc.addLog(log);
    fixture.detectChanges();
    const row = fixture.nativeElement.querySelectorAll('tr');
    expect(row).toBeTruthy();
  });
  
  it('log row should include an AtxIconRendererComponent component', () => {
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, buildHttpMockLoggingMetadata());
    stateSvc.addLog(log);
    fixture.detectChanges();
    const renderer = fixture.debugElement.query(By.css("atx-icon-renderer"));
    expect(renderer.componentInstance).toBeTruthy();
    // Test introspection bug because of the use of a class factorisation: log is undefined while currLog is protected!
    //expect(renderer.componentInstance.log).toBe(log);
    expect(renderer.componentInstance.currLog).toBe(log);
  });
  
  it('log row should invoke the UrlUtil.getResourceName() method', () => {
    spyOn(UrlUtil, "getResourceName");
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, buildHttpMockLoggingMetadata());
    stateSvc.addLog(log);
    fixture.detectChanges();
    expect(UrlUtil.getResourceName).toHaveBeenCalledWith(log);
  });
  
  it('log row should invoke the UrlUtil.getResourcePath() method', () => {
    spyOn(UrlUtil, "getResourcePath").and.returnValue("resource");
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ status: HttpStatusCode.BadRequest }),
      requestMetadata: {
          duration: 260,
          stalled: 964,
          start: 695,
          url: URL_OBJ,
          id: Uuid.build()
      }
    };
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.ERROR, metadata);
    stateSvc.addLog(log);
    fixture.detectChanges();
    expect(UrlUtil.getResourcePath).toHaveBeenCalledWith(log);
  });
  
  it('log row should display prefetch UI when response is not available', () => {
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      requestMetadata: {
          duration: 260,
          stalled: 964,
          start: 695,
          url: URL_OBJ,
          id: Uuid.build()
      }
    };
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.CONFIG, metadata);
    stateSvc.addLog(log);
    fixture.detectChanges();
    const tbody = fixture.nativeElement.querySelector('tbody');
    const tdList = tbody.querySelectorAll('td');
    expect(tdList[1].textContent.includes("prefetch")).toBeTrue();
    expect(tdList[2].textContent.includes("---")).toBeTrue();
    expect(tdList[3].textContent.includes("---")).toBeTrue();
  });
  
  it('log row should display the spinner icon when response is not available', () => {
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      requestMetadata: {
          duration: 260,
          stalled: 964,
          start: 695,
          url: URL_OBJ,
          id: Uuid.build()
      }
    };
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.CONFIG, metadata);
    stateSvc.addLog(log);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('atx-spinner');
    expect(spinner).toBeTruthy();
  });

  it('log row should display HTTP response information when response is available', () => {
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, buildHttpMockLoggingMetadata());
    stateSvc.addLog(log);
    fixture.detectChanges();
    const tbody = fixture.nativeElement.querySelector('tbody');
    const tdList = tbody.querySelectorAll('td');
    const metadata = log.metadata;
    expect(tdList[1].textContent.includes(metadata.response.status)).toBeTrue();
    expect(tdList[2].textContent.includes("0 B")).toBeTrue();
    expect(tdList[3].textContent.includes(metadata.requestMetadata.duration + " ms")).toBeTrue();
  });
  
  it('log row should invoke the AtxUserActionService.sendAction() method when it is clicked', () => {
    const actionSvc = fixture.debugElement.injector.get(AtxUserActionService);
    const stateSvc = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    spyOn(actionSvc, "sendAction");
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, buildHttpMockLoggingMetadata());
    stateSvc.addLog(log);
    fixture.detectChanges();
    const tbody = fixture.nativeElement.querySelector('tbody');
    const row = tbody.querySelector('tr');
    row.click();
    expect(actionSvc.sendAction).toHaveBeenCalledWith(AtxConsoleActionType.LOG_SELECT, log);
  });
});

