/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockFullDescriptionComponent } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-full-description/atx-mock-full-description.component';
import { FullDescription } from 'projects/angular-toolbox/src/lib/framework/mock/documentation/model/business/full-description.type';
import { AtxMockDescriptionComponent } from 'projects/angular-toolbox/src/lib/framework/mock/documentation/component/atx-mock-description/atx-mock-description.component';

describe('AtxMockFullDescriptionComponent', () => {
  let component: AtxMockFullDescriptionComponent;
  let fixture: ComponentFixture<AtxMockFullDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AtxMockFullDescriptionComponent,
        AtxMockDescriptionComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMockFullDescriptionComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display nothing by default', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('.description');
    expect(div).toBeNull();
  });

  /*it('should display the description', () => {
    const cfg: FullDescription = { description: "Lorem ipsum" };
    component.config = cfg;
    fixture.detectChanges();
    console.log(fixture.nativeElement)
    const comp: any = fixture.debugElement.query(By.css('atx-mock-description'));
    expect(comp.instance).toBeTruthy();
    expect(comp.instance.description).toEqual(cfg.description);
  });*/

  // Hack to replace test above that does not work:
  it('should display the description', () => {
    const cfg: FullDescription = { description: "Lorem ipsum" };
    component.config = cfg;
    fixture.detectChanges();
    const elm: HTMLElement = fixture.nativeElement.querySelector('atx-mock-description');
    expect(elm).toBeTruthy();
    expect(elm.firstChild?.textContent).toEqual(cfg.description as any);
  });

  it('should display the origin', () => {
    const cfg: FullDescription = { origin: "Lorem ipsum" };
    component.config = cfg;
    fixture.detectChanges();
    const dt: HTMLElement = fixture.nativeElement.querySelector('dt');
    expect(dt.textContent).toEqual("origin:");
    const code: HTMLElement = fixture.nativeElement.querySelector('code');
    expect(code.textContent).toEqual("Lorem ipsum");
  });

  it('origin should be a HTML link', () => {
    const cfg: FullDescription = { origin: "Lorem ipsum" };
    component.config = cfg;
    fixture.detectChanges();
    const a: HTMLLinkElement = fixture.nativeElement.querySelector('a');
    expect(a.href.includes(encodeURIComponent("Lorem ipsum"))).toBeTrue();
    expect(a.title).toEqual("Lorem ipsum");
    expect(a.firstChild?.textContent).toEqual("Lorem ipsum");
  });
});
