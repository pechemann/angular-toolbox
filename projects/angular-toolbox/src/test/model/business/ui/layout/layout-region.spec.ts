/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LayoutRegion } from "../../../../../lib/model";

describe('LayoutRegion', () => {

  it('NORTH should be "north"', () => {
    expect(LayoutRegion.NORTH).toEqual("north");
  });

  it('SOUTH should be "south"', () => {
    expect(LayoutRegion.SOUTH).toEqual("south");
  });

  it('WEST should be "west"', () => {
    expect(LayoutRegion.WEST).toEqual("west");
  });

  it('EAST should be "east"', () => {
    expect(LayoutRegion.EAST).toEqual("east");
  });

  it('CENTER should be "center"', () => {
    expect(LayoutRegion.CENTER).toEqual("center");
  });
});
