/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { STORAGE_KEY, CSS_PROP } from "../../../../lib/model";

describe('Dark Mode Constants', () => {

  it('STORAGE_KEY should be "dark-mode-key"', () => {
    expect(STORAGE_KEY).toEqual("dark-mode-key");
  });
  
  it('CSS_PROP should be "dark-mode"', () => {
    expect(CSS_PROP).toEqual("dark-mode");
  });
});
