/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DEFAULT_SCROLL_BEHAVIOR } from '../../lib/util/default-scroll-behavior';

describe('DEFAULT_SCROLL_BEHAVIOR', () => {
  
  it('behavior value should be "button"', () => {
    expect(DEFAULT_SCROLL_BEHAVIOR.behavior).toEqual('smooth');
  });
  
  it('block value should be "start"', () => {
    expect(DEFAULT_SCROLL_BEHAVIOR.block).toEqual('start');
  });
  
  it('inline value should be "nearest"', () => {
    expect(DEFAULT_SCROLL_BEHAVIOR.inline).toEqual('nearest');
  });
});
