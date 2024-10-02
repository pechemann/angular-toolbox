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

  const params: HttpParameterDescriptor[] = [
    {
      ref: "param-ref-1",
      description : "param description-1"
    },
    {
      ref: "param-ref-2",
      description : "param description-2"
    }
  ];

  let component: AtxMockParamComponent;
  let fixture: ComponentFixture<AtxMockParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMockParamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMockParamComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should not render anything by default', () => {
    expect(fixture.nativeElement.querySelector('dl')).toBeNull();
  });

  it('should create a set if data list with "param" as css class', () => {
    component.params = params;
    fixture.detectChanges();
    const dl = fixture.nativeElement.querySelectorAll('dl');
    expect(dl.length).toEqual(2);
    dl.forEach((elm: any) => expect(elm.classList.contains("param")).toBeTrue());
  });
  
  it('should display the parameter ref value', () => {
    component.params = params;
    fixture.detectChanges();
    const dtCode = fixture.nativeElement.querySelectorAll('dt code');
    let i: number = 0;
    dtCode.forEach((elm: any) => {
      expect(elm.textContent).toEqual(params[i].ref);
      ++i;
    });
  });
  
  it('should display the parameter description value', () => {
    component.params = params;
    fixture.detectChanges();
    const dd = fixture.nativeElement.querySelectorAll('dd');
    let i: number = 0;
    dd.forEach((elm: any) => {
      expect(elm.textContent).toEqual(params[i].description);
      ++i;
    });
  });
  
  it('should render HTML tags', () => {
    const desc: string = "param description";
    const htmlParam: HttpParameterDescriptor = {
      ref: "param-ref",
      description : `<em>${desc}</em>`
    };
    component.params = [ htmlParam ];
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('em');
    expect(h3.textContent).toEqual(desc);
  });
});
