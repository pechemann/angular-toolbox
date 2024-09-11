/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Version } from '../../../../lib/model/business/version/version';
import { VersionImpl } from '../../../../lib/core/impl/version/version.impl';
import { BUILD_TIMESTAMP, MAJOR, METADATA, MINOR, PATCH } from '../../abstract/test-config/version.service-test-util';
import { VersionUtil } from 'projects/angular-toolbox/src/public-api';

describe('VersionImpl', () => {

  let version: VersionImpl;

  beforeEach(() => {
    version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TIMESTAMP, METADATA);
  });

  it('should create an instance', () => {
    expect(version).toBeTruthy();
  });
  
  it('major should return the major version number', () => {
    expect(version.major).toBe(MAJOR);
  });

  it('minor should return the minor version number', () => {
    expect(version.minor).toBe(MINOR);
  });

  it('patch should return the patch version number', () => {
    expect(version.patch).toBe(PATCH);
  });

  it('buildTimeStamp should return the correct timestamp number', () => {
    expect(version.buildTimeStamp).toBe(BUILD_TIMESTAMP);
  });

  it('metadata should return the correct metadata string', () => {
    expect(version.metadata).toBe(METADATA);
  });

  it('metadata should be undefined by default', () => {
    const v: Version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TIMESTAMP);
    expect(v.metadata).toBeUndefined();
  });

  it('toString() should invoke the VersionUtil.stringify() method', () => {
    spyOn(VersionUtil, "stringify");
    version.toString();
    expect(VersionUtil.stringify).toHaveBeenCalledWith(version);
  });
});
