import { DARK_MODE_CONFIG } from './dark-mode.service';

describe('DARK_MODE_CONFIG', () => {

  it('default storageKey should be "dark-mode"', () => {
    expect(DARK_MODE_CONFIG.cssProperty).toEqual("dark-mode");
  });
  
  it('default cssProperty should be "dark-mode-key"', () => {
    expect(DARK_MODE_CONFIG.storageKey).toEqual("dark-mode-key");
  });
  
  it('default darkModeEnbled should be false', () => {
    expect(DARK_MODE_CONFIG.darkModeEnbled).toBeFalse();
  });

  it('default darkModeEnbled should be false', () => {
    expect(DARK_MODE_CONFIG.darkModeEnbled).toBeFalse();
  });
});
