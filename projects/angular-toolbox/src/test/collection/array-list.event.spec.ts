/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ArrayList, ArrayListEvent } from "../../public-api";

const arrayList: ArrayList<void> = new ArrayList();

const buildArrayListEvent = (type: string, list: ArrayList<void>): ArrayListEvent<void> => {
  return new ArrayListEvent(type, list);
}

describe('ArrayListEvent', () => {

  let event: ArrayListEvent<void>;

  it('should create an instance', () => {
    event = buildArrayListEvent(ArrayListEvent.ADD, arrayList);
    expect(event).toBeTruthy();
  });
  
  it('type should be the same valus as passed to the type parameter', () => {
    event = buildArrayListEvent(ArrayListEvent.ADD, arrayList);
    expect(event.type).toEqual(ArrayListEvent.ADD);
    event = buildArrayListEvent(ArrayListEvent.REMOVE, arrayList);
    expect(event.type).toEqual(ArrayListEvent.REMOVE);
  });
  
  it('list should be the same valus as passed to the list parameter', () => {
    event = buildArrayListEvent(ArrayListEvent.ADD, arrayList);
    expect(event.list).toEqual(arrayList);
  });
  
  it('ArrayListEvent.ADD_ALL should equal to "add"', () => {
    expect(ArrayListEvent.ADD_ALL).toEqual("addAll");
  });
  
  it('ArrayListEvent.ADD should equal to "add"', () => {
    expect(ArrayListEvent.ADD).toEqual("add");
  });
  
  it('ArrayListEvent.REMOVE_ALL should equal to "removeAll"', () => {
    expect(ArrayListEvent.REMOVE_ALL).toEqual("removeAll");
  });
  
  it('ArrayListEvent.REMOVE should equal to "remove"', () => {
    expect(ArrayListEvent.REMOVE).toEqual("remove");
  });
});
