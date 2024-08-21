/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AbstractLogger, ConsoleLogConnector, DefaultLogConnector } from 'projects/angular-toolbox/src/public-api';
import { ATX_LOGGER_CONFIG, LogConnector, LoggerConfig, LoggerService } from '../../../../lib/model';

describe('VersionService', () => {
  let service: LoggerService;

  it('should be created when no config provider is set', () => {
    service = new LoggerService(undefined as any);
    expect(service).toBeTruthy();
  });

  it('should be created when the ATX_LOGGER_CONFIG provider is set', () => {
    service = new LoggerService(ATX_LOGGER_CONFIG);
    expect(service).toBeTruthy();
  });

  it('should not change the log connectoer when the LoggerConfig.logConnector property is not defined', () => {
    const config: LoggerConfig = {};
    service = new LoggerService(config);
    expect(service.getLogConnector()).toBeInstanceOf(DefaultLogConnector);
  });

  it('should change the log connectoer when the LoggerConfig.logConnector property is defined', () => {
    const connector: LogConnector = new ConsoleLogConnector();
    const config: LoggerConfig = {
      logConnector: connector
    };
    service = new LoggerService(config);
    expect(service.getLogConnector()).toBe(connector);
  });

  it('should extends the AbstractLogger class', () => {
    service = new LoggerService(ATX_LOGGER_CONFIG);
    // All base functionalities are tested in the AbstractLogger test suite.
    expect(service).toBeInstanceOf(AbstractLogger);
  });
});
