/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DropdownEventType } from "../../../../../lib/model";

describe('DropdownEventType', () => {

  it('TOGGLE should be "toggle"', () => {
    expect(DropdownEventType.TOGGLE).toEqual("toggle");
  });

  it('BEFORE_TOGGLE should be "beforetoggle"', () => {
    expect(DropdownEventType.BEFORE_TOGGLE).toEqual("beforetoggle");
  });
});
