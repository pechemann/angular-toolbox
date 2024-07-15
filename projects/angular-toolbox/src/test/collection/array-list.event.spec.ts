/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ArrayList, ArrayListEvent, ArrayListEventType } from "../../public-api";

const arrayList: ArrayList<void> = new ArrayList();

const buildArrayListEvent = (type: ArrayListEventType, list: ArrayList<void>): ArrayListEvent<void> => {
  return new ArrayListEvent(type, list);
}

describe('ArrayListEvent', () => {

  let event: ArrayListEvent<void>;

  it('should create an instance', () => {
    event = buildArrayListEvent(ArrayListEventType.ADD, arrayList);
    expect(event).toBeTruthy();
  });
  
  it('type should be the same valus as passed to the type parameter', () => {
    event = buildArrayListEvent(ArrayListEventType.ADD, arrayList);
    expect(event.type).toEqual(ArrayListEventType.ADD);
    event = buildArrayListEvent(ArrayListEventType.REMOVE, arrayList);
    expect(event.type).toEqual(ArrayListEventType.REMOVE);
  });
  
  it('list should be the same valus as passed to the list parameter', () => {
    event = buildArrayListEvent(ArrayListEventType.ADD, arrayList);
    expect(event.list).toEqual(arrayList);
  });
});
