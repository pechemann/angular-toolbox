import { VersionImpl } from '../../../../lib/model/business/impl/version/version.impl';

describe('VersionImpl', () => {

  const MAJOR: number = 2;
  const MINOR: number = 5;
  const PATCH: number = 32;
  const BUILD_TS: number = Date.now();

  let version: VersionImpl;

  beforeEach(() => {
    version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TS);
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
    expect(version.buildTimeStamp).toBe(BUILD_TS);
  });

  it('toString() should return string representation of the version in the form "M.m.p"', () => {
    expect(version.toString()).toBe(`${MAJOR}.${MINOR}.${PATCH}`);
  });
});
