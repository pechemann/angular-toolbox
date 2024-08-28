/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxJsonViewerPanelComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/json-viewer-panel/json-viewer-panel.component';
import { DataUtil } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/data.util';
import { DATA } from '../../../test-util/http-monitoring-test-util';
import { By } from '@angular/platform-browser';

describe('JsonViewerComponent', () => {
  let component: AtxJsonViewerPanelComponent;
  let fixture: ComponentFixture<AtxJsonViewerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxJsonViewerPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxJsonViewerPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty by default', () => {
    expect(fixture.nativeElement.children.length).toEqual(0);
  });

  it('should render primitive types', () => {
    const nativeElement = fixture.nativeElement;
    const data = DataUtil.parseJson("Lorem ipsum", "Lorem ipsum");
    component.data = data;
    fixture.detectChanges();
    expect(nativeElement.querySelector(".primitive")).toBeTruthy();
    const spanList = nativeElement.querySelectorAll("span");
    let span = spanList[0];
    expect(span.textContent.includes(data.label)).toBeTrue();
    expect(span.classList.contains("atx-prop-label")).toBeTrue();
    span = spanList[1];
    expect(span.textContent.includes(data.value)).toBeTrue();
    expect(span.classList.contains(data.typeClass)).toBeTrue();
  });
  
  it('should render JSON objects into a details component', () => {
    const nativeElement = fixture.nativeElement;
    const data = DataUtil.parseJson(DATA);
    component.data = data;
    fixture.detectChanges();
    expect(nativeElement.querySelector("details")).toBeTruthy();
  });

  it('should display the JSON value only in the summary element when no label is defined', () => {
    const nativeElement = fixture.nativeElement;
    const data = DataUtil.parseJson(DATA);
    component.data = data;
    fixture.detectChanges();
    const summary = nativeElement.querySelector("summary");
    expect(summary.textContent.includes(data.value)).toBeTrue();
  });

  it('should display the both, value and label, in the summary element when the label is defined', () => {
    const nativeElement = fixture.nativeElement;
    const data = DataUtil.parseJson(DATA);
    data.label = "Lorem ipsum";
    component.data = data;
    fixture.detectChanges();
    const spanList = nativeElement.querySelectorAll("summary span");
    let span = spanList[0];
    expect(span.textContent.includes(data.label)).toBeTrue();
    expect(span.classList.contains("atx-prop-label")).toBeTrue();
    span = spanList[1];
    expect(span.textContent.includes(data.value)).toBeTrue();
    expect(span.classList.contains(data.typeClass)).toBeTrue();
  });
  
  it('should display data recursively when the AtxConsoleJson object has children', () => {
    const data = DataUtil.parseJson(DATA);
    const children = (data as any).children[0];
    component.data = data;
    fixture.detectChanges();
    const panel = fixture.debugElement.query(By.css("atx-json-viewer-panel"));
    expect(panel.componentInstance).toBeTruthy();
    expect(panel.componentInstance.data).toBe(children);
  });
});
