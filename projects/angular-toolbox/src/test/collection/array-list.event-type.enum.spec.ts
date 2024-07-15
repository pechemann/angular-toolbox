/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ArrayListEventType } from "../../public-api";

describe('ArrayListEventType', () => {
  
  it('ArrayListEventType.ADD_ALL should equal to "add"', () => {
    expect(ArrayListEventType.ADD_ALL).toEqual("addAll");
  });
  
  it('ArrayListEventType.ADD should equal to "add"', () => {
    expect(ArrayListEventType.ADD).toEqual("add");
  });
  
  it('ArrayListEventType.REMOVE_ALL should equal to "removeAll"', () => {
    expect(ArrayListEventType.REMOVE_ALL).toEqual("removeAll");
  });
  
  it('ArrayListEventType.REMOVE should equal to "remove"', () => {
    expect(ArrayListEventType.REMOVE).toEqual("remove");
  });
});
