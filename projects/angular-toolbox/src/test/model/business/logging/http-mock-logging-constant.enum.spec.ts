/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockLoggingConstant } from '../../../../lib/model/business/logging/http-mock-logging-constant.enum';

describe('HttpMockLoggingConstant', () => {
  
  it('HttpMockLoggingConstant.CALLER should be "HTTP Mocking Framework"', () => {
    expect(HttpMockLoggingConstant.CALLER).toEqual('HTTP Mocking Framework');
  });
  
  it('HttpMockLoggingConstant.RESPONSE_MESSAGE should be "HTTP response"', () => {
    expect(HttpMockLoggingConstant.RESPONSE_MESSAGE).toEqual('HTTP response');
  });
  
  it('HttpMockLoggingConstant.ERROR_MESSAGE should be "HTTP error"', () => {
    expect(HttpMockLoggingConstant.ERROR_MESSAGE).toEqual('HTTP error');
  });
  
  it('HttpMockLoggingConstant.CONFIG_MESSAGE should be "HTTP prefetch"', () => {
    expect(HttpMockLoggingConstant.CONFIG_MESSAGE).toEqual('HTTP prefetch');
  });
});
