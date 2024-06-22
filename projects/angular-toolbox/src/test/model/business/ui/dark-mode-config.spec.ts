/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { DARK_MODE_CONFIG } from "../../../../lib/model";

describe('DARK_MODE_CONFIG', () => {

  it('default storageKey should be "dark-mode"', () => {
    expect(DARK_MODE_CONFIG.cssProperty).toEqual("dark-mode");
  });
  
  it('default cssProperty should be "dark-mode-key"', () => {
    expect(DARK_MODE_CONFIG.storageKey).toEqual("dark-mode-key");
  });
  
  it('default darkModeEnabled should be false', () => {
    expect(DARK_MODE_CONFIG.darkModeEnabled).toBeFalse();
  });

  it('default darkModeEnabled should be false', () => {
    expect(DARK_MODE_CONFIG.darkModeEnabled).toBeFalse();
  });
});
