/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxConsoleFooterComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/console-footer/console-footer.component';
import { AtxMonitoringConsoleState } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-monitoring-console.state';
import { SizeUtil } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/size.util';
import { EMPTY_STRING, HttpMockLoggingMetadata, Log, LogBuilder, LogLevel, Uuid } from 'projects/angular-toolbox/src/public-api';

const url: string = "http://fake-url.com";
const data: any = { foo: "bar" };
const metadata: HttpMockLoggingMetadata = {
  request: new HttpRequest("GET", url),
  response: new HttpResponse({ body: data }),
  requestMetadata: {
      duration: 0,
      stalled: 0,
      start: 0,
      url: new URL(url),
      id: Uuid.build()
  }
};

describe('ConsoleFooterComponent', () => {
  let service: AtxMonitoringConsoleState;
  let component: AtxConsoleFooterComponent;
  let fixture: ComponentFixture<AtxConsoleFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxConsoleFooterComponent],
      providers: [AtxMonitoringConsoleState]
    })
    .compileComponents();

    service = TestBed.inject(AtxMonitoringConsoleState);
    fixture = TestBed.createComponent(AtxConsoleFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default number of logs', () => {
    const divList = fixture.nativeElement.querySelectorAll('div');
    expect(divList[0].textContent).toContain("0 request(s)");
  });

  it('should display the default cumulative logs size', () => {
    const divList = fixture.nativeElement.querySelectorAll('div');
    expect(divList[2].textContent).toContain(`${SizeUtil.INITIAL_SIZE} resources`);
  });

  it('should display the updated number of logs', () => {
    const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    const divList = fixture.nativeElement.querySelectorAll('div');
    service.addLog(log);
    fixture.detectChanges();
    expect(divList[0].textContent).toContain("1 request(s)");
  });

  it('should display the updated size', () => {
    const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    const divList = fixture.nativeElement.querySelectorAll('div');
    const size: number = SizeUtil.getSize(data);
    service.addLog(log);
    fixture.detectChanges();
    expect(divList[2].textContent).toContain(`${SizeUtil.sizeToString(size)} resources`);
  });
});
