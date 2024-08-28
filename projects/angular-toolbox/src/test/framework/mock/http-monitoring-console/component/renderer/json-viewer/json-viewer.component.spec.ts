/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AtxJsonViewerComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/renderer/json-viewer/json-viewer.component';
import { DATA } from '../../../test-util/http-monitoring-test-util';
import { DataUtil } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/data.util';

describe('JsonViewerComponent', () => {
  let component: AtxJsonViewerComponent;
  let fixture: ComponentFixture<AtxJsonViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxJsonViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxJsonViewerComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });
  
  it('AtxJsonViewerPanelComponent should be displayed anyway', () => {
    expect(fixture.nativeElement.querySelector('atx-json-viewer-panel')).toBeTruthy();
  });

  it('the data setter should invoke the DataUtil.parseJson() method', () => {
    spyOn(DataUtil, "parseJson");
    component.data = DATA;
    expect(DataUtil.parseJson).toHaveBeenCalledOnceWith(DATA);
  });

  it('the data setter should bind the data to the embeded AtxJsonViewerComponent component', (done) => {
    let panel = fixture.debugElement.query(By.css("atx-json-viewer-panel"));
    expect(panel.componentInstance.data).toBeNull();
    component.data = DATA;
    fixture.detectChanges();
    fixture.whenStable().then(_=> {
      expect(panel.componentInstance.data).not.toBeNull();
      done();
    });
  });
});
