/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockResponseDelayUtil } from 'projects/angular-toolbox/src/lib/framework/mock/http/util/http-mock-response-delay.util';
import { HTTP_MOCK_MAX_DELAY } from 'projects/angular-toolbox/src/public-api';

describe('HttpMockResponseDelayUtil', () => {
  
  it('HttpMockResponseDelayUtil.getResponseDelay() should return a "ResponseDelay" object', () => {
    const result = HttpMockResponseDelayUtil.getResponseDelay(100);
    expect(result.duration).toBeTruthy();
    expect(result.stalled).toBeTruthy();
  });

  it('HttpMockResponseDelayUtil.getResponseDelay(timer) should create a duration equal to the timer parameter by default', () => {
    const result = HttpMockResponseDelayUtil.getResponseDelay(100);
    expect(result.duration).toEqual(100);
  });

  it('HttpMockResponseDelayUtil.getResponseDelay(timer) should create a duration equal to HTTP_MOCK_MAX_DELAY when timer is greater than HTTP_MOCK_MAX_DELAY', () => {
    const result = HttpMockResponseDelayUtil.getResponseDelay(HTTP_MOCK_MAX_DELAY + 10);
    expect(result.duration).toEqual(HTTP_MOCK_MAX_DELAY);
  });

  it('HttpMockResponseDelayUtil.getResponseDelay(timer) should create a duration equal to 0 when timer is lowerr than 0', () => {
    const result = HttpMockResponseDelayUtil.getResponseDelay(-10);
    expect(result.duration).toEqual(0);
  });

  it('HttpMockResponseDelayUtil.getResponseDelay(timer) should create a stalled value between 0 and the timer value', () => {
    const result = HttpMockResponseDelayUtil.getResponseDelay(100).stalled;
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });
});
