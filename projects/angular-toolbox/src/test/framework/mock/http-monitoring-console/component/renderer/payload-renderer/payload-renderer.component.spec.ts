/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxPayloadRendererComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/payload-renderer/payload-renderer.component';
import { buildHttpMockLoggingMetadata, buildLog, DATA, STRING_DATA, URL_STRING } from '../../../test-util/http-monitoring-test-util';
import { EMPTY_STRING, Log, LogBuilder, LogLevel } from 'projects/angular-toolbox/src/public-api';
import { HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('AtxPayloadRendererComponent', () => {
  let component: AtxPayloadRendererComponent;
  let fixture: ComponentFixture<AtxPayloadRendererComponent>;
  let log: Log;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxPayloadRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxPayloadRendererComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty by default', () => {
    expect(fixture.nativeElement.children.length).toEqual(0);
  });

  it('should display the UI associated with the query params', () => {
    const nativeElement = fixture.nativeElement;
    log = buildLog();
    log.metadata.request.params = new HttpParams().append("foo", "bar");
    component.log = log;
    fixture.detectChanges();
    const summary = nativeElement.querySelector('summary');
    expect(summary.textContent.includes("Query String Parameters")).toBeTrue();
    const dt = nativeElement.querySelector('dt');
    expect(dt.textContent.includes("foo")).toBeTrue();
    const dd = nativeElement.querySelector('dd');
    expect(dd.textContent.includes("bar")).toBeTrue();
  });

  it('should display the UI associated with the JSON data', () => {
    const nativeElement = fixture.nativeElement;
    const metadata =  {
      request: new HttpRequest("POST", URL_STRING, STRING_DATA),
      response: new HttpResponse(),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    spyOn(JSON, "parse").and.returnValue(DATA);
    log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const summary = nativeElement.querySelector('summary');
    expect(summary.textContent.includes("Request Payload")).toBeTrue();
    const viewer = fixture.debugElement.query(By.css("atx-json-viewer"));
    expect(viewer.componentInstance).toBeTruthy();
    expect(viewer.componentInstance.data).not.toBeNull();
    expect(JSON.parse).toHaveBeenCalledOnceWith(STRING_DATA);
  });

  it('should display the UI associated with the form data', () => {
    const nativeElement = fixture.nativeElement;
    const fomrData = new FormData();
    fomrData.append("foo", "bar");
    const metadata =  {
      request: new HttpRequest("POST", URL_STRING, fomrData),
      response: new HttpResponse(),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const summary = nativeElement.querySelector('summary');
    expect(summary.textContent.includes("Form Data")).toBeTrue();
    const li = nativeElement.querySelector('li');
    expect(li.textContent.includes("foo")).toBeTrue();
    expect(li.textContent.includes("bar")).toBeTrue();
  });
});
