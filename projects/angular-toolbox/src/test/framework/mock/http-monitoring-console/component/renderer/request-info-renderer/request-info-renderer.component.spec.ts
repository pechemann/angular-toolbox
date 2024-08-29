/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxRequesInfoComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/request-info-renderer/request-info-renderer.component';
import { buildHttpMockLoggingMetadata, buildLog, URL_STRING } from '../../../test-util/http-monitoring-test-util';
import { HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { EMPTY_STRING, httpHeadersMock, LogBuilder, LogLevel } from 'projects/angular-toolbox/src/public-api';

describe('AtxRequesInfoComponent', () => {
  let component: AtxRequesInfoComponent;
  let fixture: ComponentFixture<AtxRequesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxRequesInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxRequesInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default UI via details containers', () => {
    const nativeElement = fixture.nativeElement;
    const details = nativeElement.querySelectorAll('details');
    expect(details.length).toEqual(3);
    expect(details[0].open).toBeTrue();
    const summaryList = nativeElement.querySelectorAll('summary');
    expect(summaryList[0].textContent.includes("General")).toBeTrue();
    expect(summaryList[1].textContent.includes("Response Headers")).toBeTrue();
    expect(summaryList[2].textContent.includes("Request Headers")).toBeTrue();
    const dtList = nativeElement.querySelectorAll('dt');
    expect(dtList[0].textContent.includes("Request URL:")).toBeTrue();
    expect(dtList[1].textContent.includes("Request Method:")).toBeTrue();
    expect(dtList[2].textContent.includes("Status Code:")).toBeTrue();
  });

  it('should display the HTTP request URL, method and prefetch status', () => {
    const nativeElement = fixture.nativeElement;
    const request = new HttpRequest("GET", URL_STRING);
    const metadata =  {
      request: request,
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const ddList = nativeElement.querySelectorAll('dd');
    expect(ddList[0].textContent.includes(request.url)).toBeTrue();
    expect(ddList[1].textContent.includes(request.method)).toBeTrue();
    expect(ddList[2].textContent.includes("prefetch")).toBeTrue();
    const svg = nativeElement.querySelector('svg');
    expect(svg.getAttribute("fill")).toEqual("orange");
  });

  it('should display the HTTP response status', () => {
    const nativeElement = fixture.nativeElement;
    const response = new HttpResponse();
    const metadata =  {
      request: new HttpRequest("GET", URL_STRING),
      response: response,
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const dd = nativeElement.querySelectorAll('dd')[2];
    expect(dd.textContent.includes("OK")).toBeTrue();
    expect(dd.textContent.includes("200")).toBeTrue();
    const svg = nativeElement.querySelector('svg');
    expect(svg.getAttribute("style")).toEqual("fill: green;");
  });

  it('should display error indicator when HTTP response status is greater than, or equal to 400', () => {
    const nativeElement = fixture.nativeElement;
    const response = new HttpResponse({
      status: HttpStatusCode.BadGateway,
      statusText: "Bad Gateway"
    });
    const metadata =  {
      request: new HttpRequest("GET", URL_STRING),
      response: response,
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const svg = nativeElement.querySelector('svg');
    expect(svg.getAttribute("style")).toEqual("fill: red;");
  });
  
  it('should display the HTTP request headers', () => {
    const nativeElement = fixture.nativeElement;
    const headers = httpHeadersMock().accept().cacheControl().headers();
    const request = new HttpRequest("GET", URL_STRING, { headers: headers });
    const metadata =  {
      request: request,
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const section = nativeElement.querySelectorAll('section')[2];
    const dtList = section.querySelectorAll('dt');
    expect(dtList[0].textContent.includes("Accept")).toBeTrue();
    expect(dtList[1].textContent.includes("Cache-Control")).toBeTrue();
    const ddList = section.querySelectorAll('dd');
    expect(ddList[0].textContent.includes(headers.get("Accept"))).toBeTrue();
    expect(ddList[1].textContent.includes(headers.get("Cache-Control"))).toBeTrue();
  });

  it('should display the HTTP response headers', () => {
    const nativeElement = fixture.nativeElement;
    const headers = httpHeadersMock().accept().cacheControl().headers();
    const response = new HttpResponse({ headers: headers });
    const metadata =  {
      request: new HttpRequest("GET", URL_STRING, { headers: headers }),
      response: response,
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const section = nativeElement.querySelectorAll('section')[1];
    const dtList = section.querySelectorAll('dt');
    expect(dtList[0].textContent.includes("Accept")).toBeTrue();
    expect(dtList[1].textContent.includes("Cache-Control")).toBeTrue();
    const ddList = section.querySelectorAll('dd');
    expect(ddList[0].textContent.includes(headers.get("Accept"))).toBeTrue();
    expect(ddList[1].textContent.includes(headers.get("Cache-Control"))).toBeTrue();
  });
});
