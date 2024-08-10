/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AbstractLogger } from 'projects/angular-toolbox/src/public-api';
import { LoggerService } from '../../../../lib/model';

describe('VersionService', () => {
  let service: LoggerService;

  beforeEach(() => {
    service = new LoggerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should extends the AbstractLogger class', () => {
    // All functionalities are tested in the AbstractLogger test suite.
    expect(service).toBeInstanceOf(AbstractLogger);
  });
});
