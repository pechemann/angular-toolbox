import { VersionImpl } from '../../../../lib/model/core/impl/version.impl';

describe('VersionImpl', () => {

  const MAJOR: number = 2;
  const MINOR: number = 5;
  const PATCH: number = 32;

  let version: VersionImpl;

  beforeEach(() => {
    version = new VersionImpl(MAJOR, MINOR, PATCH);
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

  it('toString() should return string representation of the version in the form "M.m.p"', () => {
    expect(version.toString()).toBe(`${MAJOR}.${MINOR}.${PATCH}`);
  });
});
