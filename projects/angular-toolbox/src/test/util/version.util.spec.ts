/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Version } from '../../lib/model/business/version/version';
import { VersionImpl } from '../../lib/core/impl/version/version.impl';
import { BUILD_TIMESTAMP, MAJOR, METADATA, MINOR, PATCH } from '../core/abstract/test-config/version.service-test-util';
import { VersionUtil } from '../../public-api';

describe('VersionUtil', () => {

  it('stringify() should return a string representation of the version in the form "M.m.p-metadata"', () => {
    const version: Version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TIMESTAMP, METADATA);
    expect(VersionUtil.stringify(version)).toBe(`${MAJOR}.${MINOR}.${PATCH}-${METADATA}`);
  });

  it('stringify() should return a string representation of the version in the form "M.m.p when no metadata are provided"', () => {
    const version: Version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TIMESTAMP);
    expect(VersionUtil.stringify(version)).toBe(`${MAJOR}.${MINOR}.${PATCH}`);
  });

  it('equal() should return true when both Version objects are identical', () => {
    const v1: Version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TIMESTAMP, METADATA);
    const v2: Version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TIMESTAMP, METADATA);
    expect(VersionUtil.equal(v1, v2)).toBeTrue();
  });

  it('equal() should return false when both Version objects are different', () => {
    const v1: Version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TIMESTAMP);
    const v2: Version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TIMESTAMP, METADATA);
    expect(VersionUtil.equal(v1, v2)).toBeFalse();
  });
});
