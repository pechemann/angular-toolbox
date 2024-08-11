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
  let logger: HttpMockLogger;

  beforeEach(() => {
    logger = new HttpMockLogger();
  });

  it('should be created', () => {
    expect(logger).toBeTruthy();
  });

  it('should extends the AbstractLogger class', () => {
    // All functionalities are tested in the AbstractLogger test suite.
    expect(logger).toBeInstanceOf(AbstractLogger);
  });
});
