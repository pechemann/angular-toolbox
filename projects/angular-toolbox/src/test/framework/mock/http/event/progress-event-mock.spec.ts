/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ProgressEventMock } from '../../../../../lib/framework/mock/http/event/progress-event-mock';

describe('ProgressEventMock', () => {

  let evtTgt: ProgressEventMock;

  beforeEach(() => {
    evtTgt = new ProgressEventMock("progress");
  });

  it('should create an instance', () => {
    expect(evtTgt).toBeTruthy();
  });
  
  it('"total" default value should be NaN', () => {
    expect(evtTgt.total).toEqual(NaN);
  });

  it('"total" setter should change the value returned by the "total" getter method', () => {
    evtTgt.total = 20;
    expect(evtTgt.total).toEqual(20);
  });
  
  it('"loaded" default value should be 0', () => {
    expect(evtTgt.loaded).toEqual(0);
  });

  it('"loaded" setter should change the value returned by the "loaded" getter method', () => {
    evtTgt.loaded = 20;
    expect(evtTgt.loaded).toEqual(20);
  });
});

