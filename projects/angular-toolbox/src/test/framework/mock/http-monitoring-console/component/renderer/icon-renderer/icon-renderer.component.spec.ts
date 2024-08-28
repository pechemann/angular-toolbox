/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxIconRendererComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/icon-renderer/icon-renderer.component';
import { DATA, URL_STRING } from '../../../test-util/http-monitoring-test-util';
import { EMPTY_STRING, LogBuilder, LogLevel } from 'projects/angular-toolbox/src/public-api';
import { ATX_IS_IMPORTED_LOG } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-is-imported-log';

describe('AtxIconRendererComponent', () => {
  let component: AtxIconRendererComponent;
  let fixture: ComponentFixture<AtxIconRendererComponent>;

  
  const buildLog = (response: any = null)=> {
    const metadata =  {
      request: new HttpRequest("GET", URL_STRING),
      response: response
    };
    return LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxIconRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxIconRendererComponent);
    component = fixture.componentInstance;
    
  });

  it('should create a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should show nothing when no log is specified', () => {
    expect(fixture.nativeElement.children.length).toEqual(0);
  });

  it('should display the spinner component when a log is specified with no response', () => {
    component.log = buildLog();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("atx-spinner")).toBeTruthy();
  });

  it('should display the #empty-icon svg when the response type is not supported', () => {
    const response = {
      body: null
    };
    component.log = buildLog(response);
    fixture.detectChanges();
    const svgRef = fixture.nativeElement.querySelector("use");
    expect(svgRef.getAttribute("href")).toEqual("#empty-icon");
    const svgList = fixture.nativeElement.querySelectorAll("svg");
    expect(svgList.length).toEqual(1);
  });

  it('should display the #json-icon svg when the response type is a JSON object', () => {
    const response = {
      body: DATA
    };
    component.log = buildLog(response);
    fixture.detectChanges();
    const svgRef = fixture.nativeElement.querySelector("use");
    expect(svgRef.getAttribute("href")).toEqual("#json-icon");
    const svgList = fixture.nativeElement.querySelectorAll("svg");
    expect(svgList.length).toEqual(1);
  });

  it('should display the #text-icon svg when the response type is a string', () => {
    const response = {
      body: "Lorem ipsum"
    };
    component.log = buildLog(response);
    fixture.detectChanges();
    const svgRef = fixture.nativeElement.querySelector("use");
    expect(svgRef.getAttribute("href")).toEqual("#text-icon");
    const svgList = fixture.nativeElement.querySelectorAll("svg");
    expect(svgList.length).toEqual(1);
  });

  it('should display the #blob-icon svg when the response type is a Blob object', () => {
    const response = {
      body: new Blob()
    };
    component.log = buildLog(response);
    fixture.detectChanges();
    const svgRef = fixture.nativeElement.querySelector("use");
    expect(svgRef.getAttribute("href")).toEqual("#blob-icon");
    const svgList = fixture.nativeElement.querySelectorAll("svg");
    expect(svgList.length).toEqual(1);
  });

  it('should display the #bin-icon svg when the response type is aa ArrayBuffer object', () => {
    const response = {
      body: new ArrayBuffer(8)
    };
    component.log = buildLog(response);
    fixture.detectChanges();
    const svgRef = fixture.nativeElement.querySelector("use");
    expect(svgRef.getAttribute("href")).toEqual("#bin-icon");
    const svgList = fixture.nativeElement.querySelectorAll("svg");
    expect(svgList.length).toEqual(1);
  });

  it('should display an additional icon when the ATX_IS_IMPORTED_LOG token is true', () => {
    const response = {
      body: new ArrayBuffer(8)
    };
    const log = buildLog(response);
    log.metadata.request.context.set(ATX_IS_IMPORTED_LOG, true);
    component.log = log;
    fixture.detectChanges();
    const svgList = fixture.nativeElement.querySelectorAll("svg");
    expect(svgList.length).toEqual(2);
  });
});
