/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxResponseBodyRendererComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/response-body-renderer/response-body-renderer.component';
import { buildHttpMockLoggingMetadata, buildLog, DATA, URL_STRING } from '../../../test-util/http-monitoring-test-util';
import { EMPTY_STRING, LogBuilder, LogLevel } from 'projects/angular-toolbox/src/public-api';

describe('AtxResponseBodyRendererComponent', () => {
  let component: AtxResponseBodyRendererComponent;
  let fixture: ComponentFixture<AtxResponseBodyRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxResponseBodyRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxResponseBodyRendererComponent);
    component = fixture.componentInstance;
  });

  it('should create a new compponent instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be empty by default', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.children.length).toEqual(0);
  });

  it('should display a message when no data is available', () => {
    component.log = buildLog();
    fixture.detectChanges();
    const section = fixture.nativeElement.querySelector("strong");
    expect(section.textContent.includes("This request has no data available")).toBeTrue();
  });

  it('should display a message when data is not relevant', () => {
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ body: 3 }),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const section = fixture.nativeElement.querySelector("strong");
    expect(section.textContent.includes("This request has no data available")).toBeTrue();
  });

  it('should render raw text', () => {
    const text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ body: text }),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const section = fixture.nativeElement.querySelector("section");
    expect(section.textContent.includes(text)).toBeTrue();
  });

  it('should render JSON string', () => {
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ body: DATA }),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const section = fixture.nativeElement.querySelector("section");
    expect(section.textContent.includes(JSON.stringify(DATA))).toBeTrue();
  });

  it('should render blob information', () => {
    const blob: Blob = new Blob();
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ body: blob }),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const dtList = fixture.nativeElement.querySelectorAll("dt");
    expect(dtList[0].textContent.includes("Binary data:")).toBeTrue();
    expect(dtList[1].textContent.includes("size:")).toBeTrue();
    expect(dtList[2].textContent.includes("type:")).toBeTrue();
    const ddList = fixture.nativeElement.querySelectorAll("dd");
    expect(ddList[0].textContent.includes("Blob")).toBeTrue();
    expect(ddList[1].textContent.includes(blob.size)).toBeTrue();
    expect(ddList[2].textContent.includes(blob.type)).toBeTrue();
  });

  it('should render array buffer information', () => {
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(8);
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ body: arrayBuffer }),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const dtList = fixture.nativeElement.querySelectorAll("dt");
    expect(dtList[0].textContent.includes("Binary data:")).toBeTrue();
    expect(dtList[1].textContent.includes("byte length:")).toBeTrue();
    const ddList = fixture.nativeElement.querySelectorAll("dd");
    expect(ddList[0].textContent.includes("Array Buffe")).toBeTrue();
    expect(ddList[1].textContent.includes(arrayBuffer.byteLength)).toBeTrue();
  });
});
