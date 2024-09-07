/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { WindowFeatureState } from "../../../../../lib/model";

describe('WindowFeatureState', () => {

  it('WindowFeatureState.YES should be "yes"', () => {
    expect(WindowFeatureState.YES).toEqual("yes");
  });
  
  it('WindowFeatureState.NO should be "no"', () => {
    expect(WindowFeatureState.NO).toEqual("no");
  });
});
