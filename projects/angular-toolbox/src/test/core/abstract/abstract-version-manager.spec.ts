/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { Version } from '../../../lib/model';
import { VersionImpl } from '../../../lib/core/impl/version/version.impl';
import { BUILD_TIMESTAMP, CustomVersionService, MAJOR, MINOR, PATCH, TEST_CONFIG } from './test-config/version.service-test-util';

describe('AbstractVersionManager', () => {
  let service: CustomVersionService;

  beforeEach(() => {
    const testConfigProvider: any = { provide: TEST_CONFIG, useValue: TEST_CONFIG };
    TestBed.configureTestingModule({ providers: [testConfigProvider, CustomVersionService] });
    service = TestBed.inject(CustomVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getVersion() should return a Version object', () => {
    const version: Version = service.getVersion();
    expect(version.major).toBeInstanceOf(Number);
    expect(version.minor).toBeInstanceOf(Number);
    expect(version.patch).toBeInstanceOf(Number);
    expect(version.buildTimeStamp).toBeInstanceOf(Number);
    expect(version.toString()).toBeInstanceOf(String);
  });

  it('getVersion() should return the values passed to the config object', () => {
    const version: Version = service.getVersion();
    expect(version.major).toEqual(MAJOR);
    expect(version.minor).toEqual(MINOR);
    expect(version.patch).toEqual(PATCH);
    expect(version.buildTimeStamp).toEqual(BUILD_TIMESTAMP);
  });

  it('getBuidTimestamp() should return a number', () => {
    expect(service.getBuildTimestamp()).toBeInstanceOf(Number);
  });
  
  it('getVersion() should return the specified Version object implementation', () => {
    expect(service.getVersion()).toBeInstanceOf(VersionImpl);
  });
});
