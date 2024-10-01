/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxMockParamComponent } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-param/atx-mock-param.component';
import { HttpParameterDescriptor } from 'projects/angular-toolbox/src/public-api';

describe('AtxMockParamaComponent', () => {

  const param: HttpParameterDescriptor = {
    ref: "param-ref",
    description : "param description"
  };

  let component: AtxMockParamComponent;
  let fixture: ComponentFixture<AtxMockParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMockParamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMockParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should not render anything by default', () => {
    expect(fixture.nativeElement.querySelector('dl')).toBeNull();
  });

  it('should create a data list with "param" as css class', () => {
    component.param = param;
    fixture.detectChanges();
    const dl = fixture.nativeElement.querySelector('dl');
    expect(dl).not.toBeNull();
    expect(dl.classList.contains("param")).toBeTrue();
  });
  
  it('should display the parameter ref value', () => {
    component.param = param;
    fixture.detectChanges();
    const dtCode = fixture.nativeElement.querySelector('dt code');
    expect(dtCode.textContent).toEqual(param.ref);
  });
  
  it('should display the parameter description value', () => {
    component.param = param;
    fixture.detectChanges();
    const dd = fixture.nativeElement.querySelector('dd');
    expect(dd.textContent).toEqual(param.description);
  });
  
  it('should render HTML tags', () => {
    const htmlParam: HttpParameterDescriptor = {
      ref: "param-ref",
      description : `<h3>${param.description}</h3>`
    };
    component.param = htmlParam;
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toEqual(param.description);
  });
});
