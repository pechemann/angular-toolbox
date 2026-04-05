/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EMPTY_STRING, LogLevel, LogLevelStringPipe } from '../../public-api';

describe('logLevelString', () => {

  let pipe: LogLevelStringPipe;

  beforeEach(() => {
    pipe = new LogLevelStringPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  
  it('transform() should return "INFO" when the specified log level is LogLevel.INFO', () => {
    expect(pipe.transform(LogLevel.INFO) as any).toBe("INFO");
  });
  
  it('transform() should return "CONFIG" when the specified log level is LogLevel.CONFIG', () => {
    expect(pipe.transform(LogLevel.CONFIG) as any).toBe("CONFIG");
  });
  
  it('transform() should return "WARNING" when the specified log level is LogLevel.WARNING', () => {
    expect(pipe.transform(LogLevel.WARNING) as any).toBe("WARNING");
  });
  
  it('transform() should return "ERROR" when the specified log level is LogLevel.ERROR', () => {
    expect(pipe.transform(LogLevel.ERROR) as any).toBe("ERROR");
  });
  
  it('transform() should return an empty string when the specified log level is LogLevel.OFF', () => {
    expect(pipe.transform(LogLevel.OFF) as any).toBe(EMPTY_STRING);
  });
  
  it('transform() should return an empty string when the specified log level is invalid and the dieSilently parameter is true', () => {
    expect(pipe.transform(25) as any).toBe(EMPTY_STRING);
  });
  
  it('transform() should throw an error when the specified log level is invalid and the dieSilently parameter is false', () => {
    expect(()=> pipe.transform(25, false)).toThrowError();
  });

  it('transform() error message should contain the rerefence to the invalid parameter', () => {
    const invalidParam: number = 25;
    expect(()=> pipe.transform(invalidParam, false)).toThrowError("Invalid log level parameter in LogLevelStringPipe: current value is " + invalidParam + "while a LogLevel member is expected.");
  });
});
