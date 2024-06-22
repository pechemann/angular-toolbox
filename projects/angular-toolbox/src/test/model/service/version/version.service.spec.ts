/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { TestBed } from '@angular/core/testing';
import { Version, VersionService, VERSION_CONFIG } from '../../../../lib/model';
import { VersionImpl } from '../../../../lib/model/business/impl/version/version.impl';

describe('VersionService', () => {
  let service: VersionService;

  beforeEach(() => {
    const defaultConfigProvider: any = { provide: VERSION_CONFIG, useValue: VERSION_CONFIG };
    TestBed.configureTestingModule({ providers: [defaultConfigProvider] });
    service = TestBed.inject(VersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getVersion() return a Version object', () => {
    const version: Version = service.getVersion();
    expect(version.major).toBeInstanceOf(Number);
    expect(version.minor).toBeInstanceOf(Number);
    expect(version.major).toBeInstanceOf(Number);
    expect(version.buildTimeStamp).toBeInstanceOf(Number);
    expect(version.toString()).toBeInstanceOf(String);
  });

  it('should getBuidTimestamp() return a number', () => {
    expect(service.getBuildTimestamp()).toBeInstanceOf(Number);
  });
  
  it('should getVersion() return the specified Version object implementation', () => {
    expect(service.getVersion()).toBeInstanceOf(VersionImpl);
  });
});
