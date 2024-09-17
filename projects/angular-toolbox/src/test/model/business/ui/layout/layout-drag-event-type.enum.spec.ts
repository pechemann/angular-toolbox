/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LayoutDragEventType } from "../../../../../lib/model";

describe('LayoutDragEventType', () => {

  it('DRAG_START should be "dragstart"', () => {
    expect(LayoutDragEventType.DRAG_START).toEqual("dragstart");
  });

  it('DRAG_STOP should be "dragstop"', () => {
    expect(LayoutDragEventType.DRAG_STOP).toEqual("dragstop");
  });

  it('DRAGGING should be "dragging"', () => {
    expect(LayoutDragEventType.DRAGGING).toEqual("dragging");
  });
});
