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
import { BUILD_TIMESTAMP, CustomVersionService, CustomVersionServiceWithMetadata, MAJOR, METADATA, MINOR, PATCH, TEST_CONFIG, TEST_CONFIG_WITH_METADATA } from './test-config/version.service-test-util';

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
  
  it('getVersion().metadata should be undefined by default', () => {
    const version: Version = service.getVersion();
    expect(version.metadata).toBeUndefined();
  });
});

describe('AbstractVersionManager with metadata', () => {
  let service: CustomVersionServiceWithMetadata;

  beforeEach(() => {
    const testConfigProvider: any = { provide: TEST_CONFIG_WITH_METADATA, useValue: TEST_CONFIG_WITH_METADATA };
    TestBed.configureTestingModule({ providers: [testConfigProvider, CustomVersionServiceWithMetadata] });
    service = TestBed.inject(CustomVersionServiceWithMetadata);
  });

  it('getVersion() should return a Version object', () => {
    const version: Version = service.getVersion();
    expect(version.major).toBeInstanceOf(Number);
    expect(version.minor).toBeInstanceOf(Number);
    expect(version.patch).toBeInstanceOf(Number);
    expect(version.buildTimeStamp).toBeInstanceOf(Number);
    expect(version.metadata).toBeInstanceOf(String);
    expect(version.toString()).toBeInstanceOf(String);
  });
  
  it('getVersion().metadata return the value passed to the config object', () => {
    const version: Version = service.getVersion();
    expect(version.metadata).toEqual(METADATA);
  });
});
