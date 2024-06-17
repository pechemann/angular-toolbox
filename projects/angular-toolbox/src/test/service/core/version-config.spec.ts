import { VERSION_CONFIG } from '../../../lib/service/core/version.service';

describe('DARK_MODE_CONFIG', () => {

  it('default major should be 0', () => {
    expect(VERSION_CONFIG.major).toEqual(0);
  });
  
  it('default minor should be 0', () => {
    expect(VERSION_CONFIG.minor).toEqual(0);
  });
  
  it('default patch should be 0', () => {
    expect(VERSION_CONFIG.patch).toEqual(0);
  });

  it('default buildTimestamp should be NaN', () => {
    expect(VERSION_CONFIG.buildTimestamp).toEqual(NaN);
  });
});
