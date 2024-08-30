/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxTimingRendererComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/timing-renderer/timing-renderer.component';
import { buildHttpMockLoggingMetadata, buildLog, URL_STRING } from '../../../test-util/http-monitoring-test-util';
import { EMPTY_STRING, LogBuilder, LogLevel } from 'projects/angular-toolbox/src/public-api';
import { DatePipe } from '@angular/common';
import { TimelineUtil } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/timeline.util';
import { AtxTimelineData } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-timeline-data';

describe('TimingRendererComponent', () => {
  let component: AtxTimingRendererComponent;
  let fixture: ComponentFixture<AtxTimingRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxTimingRendererComponent],
      providers: [DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxTimingRendererComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty by default', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.children.length).toEqual(0);
  });

  it('should be empty if response is not defined', () => {
    const metadata = {
      request: new HttpRequest("GET", URL_STRING),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.CONFIG, metadata);
    component.log = log;
    fixture.detectChanges();
    expect(fixture.nativeElement.children.length).toEqual(0);
  });

  it('should display the starting time when a response is defined', () => {
    const nativeElement = fixture.nativeElement;
    const datePipe = TestBed.inject(DatePipe);
    const log = buildLog();
    const date = datePipe.transform(log.metadata.requestMetadata.start, "short");
    component.log = log;
    fixture.detectChanges();
    const dl = nativeElement.querySelectorAll("dl")[0];
    expect(dl.querySelector("dt").textContent.includes("Connection start")).toBeTrue();
    expect(dl.querySelector("dd").textContent.includes(date)).toBeTrue();
    const timeline = nativeElement.querySelector(".timeline");
    const textContent = timeline.textContent;
    expect(textContent.includes("stalled")).toBeTrue();
    expect(textContent.includes("download")).toBeTrue();
  });

  it('should display the Request timeline', () => {
    const log = buildLog();
    component.log = log;
    fixture.detectChanges();
    const dl = fixture.nativeElement.querySelectorAll("dl")[1];
    expect(dl.querySelector("dt").textContent.includes("Request/Response")).toBeTrue();
    expect(dl.querySelector(".timeline")).toBeTruthy();
    expect(dl.querySelector(".stalled")).toBeTruthy();
    expect(dl.querySelector(".download")).toBeTruthy();
    expect(dl.querySelectorAll(".time").length).toEqual(2);
  });

  it('should invoke the TimelineUtil.getTimelineData() method', () => {
    spyOn(TimelineUtil, "getTimelineData").and.returnValue({ downloadStart: 0, downloadLength: 100 });
    const log = buildLog();
    component.log = log;
    fixture.detectChanges();
    expect(TimelineUtil.getTimelineData).toHaveBeenCalledWith(log.metadata.requestMetadata);
  });

  it('should render the Request timeline with the correct values', () => {
    const nativeElement = fixture.nativeElement;
    const log = buildLog();
    component.log = log;
    fixture.detectChanges();
    const timelineData: AtxTimelineData = TimelineUtil.getTimelineData(log.metadata.requestMetadata);
    const divList = nativeElement.querySelectorAll("div > div");
    expect(divList[0].getAttribute("style")).toEqual(`width:${timelineData.downloadStart}%`);
    const style = divList[3].getAttribute("style");
    expect(style.includes(`width:${timelineData.downloadLength}%`)).toBeTrue();
    expect(style.includes(`left:${timelineData.downloadStart}%`)).toBeTrue();
    const titmeList = nativeElement.querySelectorAll(".time");
    expect(titmeList[0].textContent.includes(timelineData.downloadStart)).toBeTrue();
    expect(titmeList[1].textContent.includes(log.metadata.requestMetadata.duration)).toBeTrue();
  });
});
