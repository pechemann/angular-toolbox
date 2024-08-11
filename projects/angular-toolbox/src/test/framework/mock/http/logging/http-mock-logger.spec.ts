/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AbstractLogger } from 'projects/angular-toolbox/src/public-api';
import { HttpMockLogger } from 'projects/angular-toolbox/src/lib/framework/mock/http/logging/http-mock-logger';

describe('VersionService', () => {
  let loger: HttpMockLogger;

  beforeEach(() => {
    loger = new HttpMockLogger();
  });

  it('should be created', () => {
    expect(loger).toBeTruthy();
  });

  it('should extends the AbstractLogger class', () => {
    // All functionalities are tested in the AbstractLogger test suite.
    expect(loger).toBeInstanceOf(AbstractLogger);
  });
});
