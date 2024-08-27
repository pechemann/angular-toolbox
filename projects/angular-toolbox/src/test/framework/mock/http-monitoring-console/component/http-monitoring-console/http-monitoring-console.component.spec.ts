/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxMonitoringConsoleState } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-monitoring-console.state';
import { AtxMonitoringConsoleComponent, EMPTY_STRING, Log, LogBuilder, LogLevel } from 'projects/angular-toolbox/src/public-api';
import { buildHttpMockLoggingMetadata, URL_STRING } from '../../test-util/http-monitoring-test-util';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('AtxMonitoringConsoleComponent: selectedLog is null', () => {
  let component: AtxMonitoringConsoleComponent;
  let fixture: ComponentFixture<AtxMonitoringConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMonitoringConsoleComponent],
      providers: [AtxMonitoringConsoleState]
    })
    .compileComponents();
   
    fixture = TestBed.createComponent(AtxMonitoringConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });
  
  it('should embed a collection of SVG icons', () => {
    // shadowRoot implicitly tests [encapsulation: ViewEncapsulation.ShadowDom]
    const iconListContainer = fixture.nativeElement.shadowRoot.querySelector('#icon-collection');
    expect(iconListContainer.querySelector("#json-icon")).toBeTruthy();
    expect(iconListContainer.querySelector("#bin-icon")).toBeTruthy();
    expect(iconListContainer.querySelector("#text-icon")).toBeTruthy();
    expect(iconListContainer.querySelector("#empty-icon")).toBeTruthy();
    expect(iconListContainer.querySelector("#blob-icon")).toBeTruthy();
  });

  it('should embed the AtxConsoleMenuComponent component', () => {
    const embededComponent = fixture.nativeElement.shadowRoot.querySelector('atx-console-menu');
    expect(embededComponent).toBeTruthy();
  });

  it('should embed the AtxConsoleFooterComponent component', () => {
    const embededComponent = fixture.nativeElement.shadowRoot.querySelector('atx-console-footer');
    expect(embededComponent).toBeTruthy();
  });

  it('should embed the AtxRequestListRendererComponent component', () => {
    const embededComponent = fixture.nativeElement.shadowRoot.querySelector('atx-request-list-renderer');
    expect(embededComponent).toBeTruthy();
  });

  it('should not embed the AtxRequestDetailsComponent component by default', () => {
    const embededComponent = fixture.nativeElement.shadowRoot.querySelector('atx-monitoring-console-details');
    expect(embededComponent).toBeFalsy();
  });

  it('should not have the "reduced-request-list" class added to the "request-list-wrapper" DIV element by default', () => {
    let div = fixture.nativeElement.shadowRoot.querySelector('.request-list-wrapper');
    expect(div.classList.contains("reduced-request-list")).toBeFalse();
  });
});

describe('AtxMonitoringConsoleComponent: selectedLog is not null', () => {
  let service: any;
  let component: AtxMonitoringConsoleComponent;
  let fixture: ComponentFixture<AtxMonitoringConsoleComponent>;

  const buildLog = ()=> {
    const metadata =  {
      request: new HttpRequest("GET", URL_STRING),
      response: new HttpResponse(),
      requestMetadata: buildHttpMockLoggingMetadata()
    };
    const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
    return log;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMonitoringConsoleComponent],
      providers: [AtxMonitoringConsoleState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMonitoringConsoleComponent);
    service = fixture.debugElement.injector.get(AtxMonitoringConsoleState);
    service.selectLog(buildLog());
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('selecting a log should add the "reduced-request-list" class to the "request-list-wrapper" DIV element', () => {
    let div = fixture.nativeElement.shadowRoot.querySelector('.request-list-wrapper');
    expect(div.classList.contains("reduced-request-list")).toBeTrue();
  });
  
  it('should embed the AtxRequestDetailsComponent component when a log is selected', () => {
    const embededComponent = fixture.nativeElement.shadowRoot.querySelector('atx-monitoring-console-details');
    expect(embededComponent).toBeTruthy();
  });

  it('should bind the selected log reference to the embeded AtxRequestDetailsComponent component', () => {
    const detailsComponent = fixture.debugElement.query(By.css("atx-monitoring-console-details"));
    expect(detailsComponent.componentInstance.log).toBe(service.selectedLog);
  });
});
