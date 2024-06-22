/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { TestBed } from '@angular/core/testing';
import { SubscriptionService, ScrollService } from '../../../../lib/model';

describe('ScrollService', () => {
  const TEST_DIV_SELECTOR: string = ".jasmine_html-reporter";
  const TIMEOUT_INTERVAL: number = 2000;
  const getTestDiv: Function = ()=> {
    return document.querySelector(TEST_DIV_SELECTOR);
  };
  const initTestDiv: Function = (view: HTMLDivElement)=> {
    const height: number = view.clientHeight;
    const width: number = view.clientWidth;
    view.style.height = "4000px";
    view.style.width = "4000px";
    return { height: height, width: width };
  };
  const restoreTestDiv: Function = async (view: HTMLDivElement, size: any)=> {
    view.style.width = size.width + "px";
    view.style.height = size.height + "px";
    await window.scrollTo({ top: 0, left: 0 });
  };
  let service: ScrollService;
  let subscription: SubscriptionService;
  let originalTimeout: number;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_INTERVAL;
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollService);
    subscription = TestBed.inject(SubscriptionService);
  });

  afterEach(()=> {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('scroll() should scroll to the correct X position', (done) => {
    const view: HTMLDivElement = getTestDiv();
    const size: any = initTestDiv(view);
    service.scroll({ left: 100 });
    setTimeout(()=> {
      expect(window.scrollX).toEqual(100);
      restoreTestDiv(view, size);
      done();
    }, 0);
  });
  
  it('scroll() should scroll to the correct Y position', (done) => {
    const view: HTMLDivElement = getTestDiv();
    const size: any = initTestDiv(view);
    service.scroll({ top: 100 });
    setTimeout(()=> {
      expect(window.scrollY).toEqual(100);
      restoreTestDiv(view, size);
      done();
    }, 0);
  });
  
  it('scrollTo() should scroll to the correct X and Y positions', (done) => {
    const view: HTMLDivElement = getTestDiv();
    const size: any = initTestDiv(view);
    service.scrollTo(100, 100);
    setTimeout(()=> {
      expect(window.scrollY).toEqual(100);
      expect(window.scrollX).toEqual(100);
      restoreTestDiv(view, size);
      done();
    }, 0);
  });

  it('gotoTop() should scroll to the top of the viewport', (done) => {
    const view: HTMLDivElement = getTestDiv();
    const size: any = initTestDiv(view);
    window.scrollTo({ top: 1000 });
    service.gotoTop('instant');
    setTimeout(()=> {
      expect(window.scrollY).toEqual(0);
      restoreTestDiv(view, size);
      done();
    }, 0);
  });
  
  it('scrollIntoView(elm, {block: "end"}) should scroll the viewport', (done) => {
    const view: HTMLDivElement = getTestDiv();
    const size: any = initTestDiv(view);
    service.scrollIntoView(TEST_DIV_SELECTOR, {block: "end"});
    setTimeout(()=> {
      expect(window.scrollY).not.toEqual(0);
      restoreTestDiv(view, size);
      done();
    }, 0);
  });

  it('onScroll() be triggered with an event', (done) => {
    const view: HTMLDivElement = getTestDiv();
    const size: any = initTestDiv(view);
    subscription.register('ScrollServiceTest', service.onScroll.subscribe(event => {
      subscription.clearAll('ScrollServiceTest');
      restoreTestDiv(view, size);
      expect(event).not.toBeNull();
      done();
    }));
    service.scroll({ top: 100});
  });
});
