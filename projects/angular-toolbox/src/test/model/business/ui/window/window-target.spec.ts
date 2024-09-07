/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { WindowTarget } from "../../../../../lib/model";

describe('WindowTarget', () => {

  it('WindowTarget.SELF should be "self"', () => {
    expect(WindowTarget.SELF).toEqual("self");
  });
  
  it('WindowTarget.BLANK should be "_blank"', () => {
    expect(WindowTarget.BLANK).toEqual("_blank");
  });
  
  it('WindowTarget.PARENT should be "_parent"', () => {
    expect(WindowTarget.PARENT).toEqual("_parent");
  });

  it('WindowTarget.TOP should be "_top"', () => {
    expect(WindowTarget.TOP).toEqual("_top");
  });

  it('WindowTarget.UNFENCED_TOP should be "_unfencedTop"', () => {
    expect(WindowTarget.UNFENCED_TOP).toEqual("_unfencedTop");
  });
});
