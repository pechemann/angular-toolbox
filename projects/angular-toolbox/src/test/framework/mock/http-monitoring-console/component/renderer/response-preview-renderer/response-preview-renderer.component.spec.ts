/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { AtxResponsePreviewRendererComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/response-preview-renderer/response-preview-renderer.component';
import { buildHttpMockLoggingMetadata, DATA, URL_STRING } from '../../../test-util/http-monitoring-test-util';
import { EMPTY_STRING, LogBuilder, LogLevel, SafeHtmlPipe } from 'projects/angular-toolbox/src/public-api';
import { UrlUtil } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/url.util';

export const getPngBlobData = (): Blob => {
  const imgData: string = atob("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");
  const byteArrays: number[] = [];
  const size: number = imgData.length;
  let i: number = 0;
  for (; i < size; ++i) byteArrays.push(imgData.charCodeAt(i));
  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], { type: 'image/png' });
};

describe('AtxResponsePreviewRendererComponent', () => {
  let component: AtxResponsePreviewRendererComponent;
  let fixture: ComponentFixture<AtxResponsePreviewRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AtxResponsePreviewRendererComponent,
        SafeHtmlPipe
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxResponsePreviewRendererComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be empty by default', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.children.length).toEqual(0);
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
    expect(section.textContent.includes("Preview not available")).toBeTrue();
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

  it('should sanitize and render HTML text', () => {
    const text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ body: `<div>${text}</div>` }),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const section = fixture.nativeElement.querySelector("section");
    const div = section.querySelector("div");
    expect(div.textContent.includes(text)).toBeTrue();
  });
  
  it('should render JSON objects', () => {
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ body: DATA }),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    component.log = log;
    fixture.detectChanges();
    const viewer = fixture.debugElement.query(By.css("atx-json-viewer"));
    expect(viewer.componentInstance).toBeTruthy();
  });

  it('should render Blob objects when type is image', () => {
    const blob: Blob = getPngBlobData();
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ body: blob, url: URL_STRING }),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    const resourceName = UrlUtil.getResourceNameFromPath(URL_STRING);
    component.log = log;
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector("img");
    expect(img).toBeTruthy();
    expect(img.getAttribute("alt")).toEqual(resourceName);
    expect(img.getAttribute("title")).toEqual(resourceName);
  });

  it('ngOnDestroy() should destroy existing image URL', () => {
    const blob: Blob = getPngBlobData();
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse({ body: blob, url: URL_STRING }),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    spyOn(URL, "revokeObjectURL");
    component.log = log;
    component.ngOnDestroy();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });
  
});
