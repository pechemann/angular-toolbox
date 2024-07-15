/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Subscription } from "rxjs";
import { ArrayList, ArrayListEvent } from "../../public-api";

type Item = { id: number};

describe('ArrayListEvent', () => {

  let list: ArrayList<Item>;
  let subscription: Subscription | null;

  beforeEach(()=> {
    list = new ArrayList<Item>();
  });

  afterEach(()=> {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  });

  it('should create an instance', () => {
    expect(list).toBeTruthy();
  });

  it('toArray() should return an array', () => {
    expect(list.toArray()).toBeInstanceOf(Array);
  });

  it('toArray() should be empty by default', () => {
    expect(list.toArray().length).toEqual(0);
  });

  it('addItem() should add the specified item to the list', () => {
    const ITEM: Item = { id: 0 };
    list.addItem(ITEM);
    expect(list.toArray()[0]).toEqual(ITEM);
  });

  it('addItem() should add the specified item at the end of the list', () => {
    const ITEM: Item = { id: 1 };
    list.addItem({ id: 0 });
    list.addItem(ITEM);
    expect(list.toArray()[1]).toEqual(ITEM);
  });

  it('addItemAt() should throw an error when index is less that 0', () => {
    const ITEM: Item = { id: 1 };
    expect(()=> list.addItemAt(ITEM, -1)).toThrowError("index must be greater that 0");
  });

  it('addItemAt() should throw an error when index is greter that the list size', () => {
    const ITEM: Item = { id: 1 };
    list.addItem({ id: 0 });
    expect(()=> list.addItemAt(ITEM, 3)).toThrowError("index exceeds the number of list elements. Index must not exceed 1.");
  });

  it('addItemAt() should at the item at the correct place', () => {
    const ITEM: Item = { id: 4 };
    list.addItem({ id: 0 });
    list.addItem({ id: 1 });
    list.addItem({ id: 2 });
    list.addItem({ id: 3 });
    list.addItemAt(ITEM, 2);
    expect(list.toArray()[2]).toEqual(ITEM);
  });
  
  it('addAll() should add the specified item to the end of the list', () => {
    const ITEM: Item = { id: 0 };
    list.addItem(ITEM);
    const itemsToAdd = [
      { id: 0 },
      { id: 1 },
      { id: 3 }
    ];
    list.addAll(itemsToAdd);
    const result = list.toArray();
    expect(result[0]).toEqual(ITEM);
    expect(result[1]).toEqual(itemsToAdd[0]);
    expect(result[2]).toEqual(itemsToAdd[1]);
    expect(result[3]).toEqual(itemsToAdd[2]);
  });

  it('getItemAt() should return undefined whether there are no item at the specified index', () => {
    expect(list.getItemAt(3)).toBeUndefined();
  });

  it('getItemAt() should return the item at the specified index', () => {
    const ITEM: Item = { id: 1 };
    list.addItem({ id: 0 });
    list.addItem(ITEM);
    list.addItem({ id: 2 });
    list.addItem({ id: 3 });
    expect(list.getItemAt(1)).toEqual(ITEM);
  });

  it('getItemIndex() should return -1 whether there are no item at the specified index', () => {
    const ITEM: Item = { id: 1 };
    expect(list.getItemIndex(ITEM)).toEqual(-1);
  });

  it('getItemIndex() should return the item index', () => {
    const ITEM: Item = { id: 1 };
    list.addItem({ id: 0 });
    list.addItem(ITEM);
    list.addItem({ id: 2 });
    list.addItem({ id: 3 });
    expect(list.getItemIndex(ITEM)).toEqual(1);
  });

  it('removeAll() should return all items in the list', () => {
    list.addItem({ id: 0 });
    list.addItem({ id: 1 });
    list.addItem({ id: 2 });
    list.addItem({ id: 3 });
    list.removeAll();
    expect(list.toArray().length).toEqual(0);
  });

  it('removeItem() should return false if the item is not in the list', () => {
    const ITEM: Item = { id: 1 };
    expect(list.removeItem(ITEM)).toBeFalse();
  });

  it('removeItem() should return true if the item is not in the list', () => {
    const ITEM: Item = { id: 1 };
    list.addItem(ITEM);
    expect(list.removeItem(ITEM)).toBeTrue();
  });

  it('removeItem() should remove the item from the list', () => {
    const ITEM: Item = { id: 1 };
    list.addItem(ITEM);
    list.removeItem(ITEM);
    expect(list.getItemIndex(ITEM)).toEqual(-1);
  });

  it('removeItemAt() should return undefined if there are no item at the specified index', () => {
    expect(list.removeItemAt(0)).toBeUndefined();
  });

  it('removeItemAt() should return the item at the specified index', () => {
    const ITEM: Item = { id: 1 };
    list.addItem(ITEM);
    expect(list.removeItemAt(0)).toEqual(ITEM);
  });

  it('removeItemAt() should remove the item at the specified index', () => {
    const ITEM: Item = { id: 1 };
    list.addItem({ id: 0 });
    list.addItem(ITEM);
    list.addItem({ id: 2 });
    list.addItem({ id: 3 });
    list.removeItemAt(1);
    const found = list.toArray().find(item => item == ITEM);
    expect(found).toBeUndefined();
  });
  
  it('length should equal to 0 by default', () => {
    expect(list.length).toEqual(0);
  });
  
  it('length should return the correct size of the list', () => {
    list.addItem({ id: 0 });
    list.addItem({ id: 1 });
    list.addItem({ id: 2 });
    list.addItem({ id: 3 });
    expect(list.length).toEqual(4);
  });
  
  it('change should dispatch an ADD_ALL event when addAll() method is invoked', (done) => {
    const itemsToAdd = [
      { id: 0 },
      { id: 1 },
      { id: 3 }
    ];
    subscription = list.change.subscribe((event: ArrayListEvent<Item>)=> {
      expect(event.type).toEqual(ArrayListEvent.ADD_ALL);
      expect(event.list).toEqual(list);
      done();
    });
    list.addAll(itemsToAdd);
  });
  
  it('change should dispatch an ADD event when addItem() method is invoked', (done) => {
    const ITEM: Item = { id: 1 };
    subscription = list.change.subscribe((event: ArrayListEvent<Item>)=> {
      expect(event.type).toEqual(ArrayListEvent.ADD);
      expect(event.list).toEqual(list);
      done();
    })
    list.addItem(ITEM);
  });
  
  it('change should dispatch an ADD event when addItemAt() method is invoked', (done) => {
    const ITEM: Item = { id: 1 };
    subscription = list.change.subscribe((event: ArrayListEvent<Item>)=> {
      expect(event.type).toEqual(ArrayListEvent.ADD);
      expect(event.list).toEqual(list);
      done();
    })
    list.addItemAt(ITEM, 0);
  });
  
  it('change should dispatch a REMOVE_ALL event when removeAll() method is invoked', (done) => {
    const itemsToAdd = [
      { id: 0 },
      { id: 1 },
      { id: 3 }
    ];
    subscription = list.change.subscribe((event: ArrayListEvent<Item>)=> {
      if (event.type !== ArrayListEvent.REMOVE_ALL) return;
      expect(event.type).toEqual(ArrayListEvent.REMOVE_ALL);
      expect(event.list).toEqual(list);
      done();
    });
    list.addAll(itemsToAdd);
    list.removeAll();
  });
  
  it('change should dispatch a REMOVE event when removeItem() method is invoked', (done) => {
    subscription = list.change.subscribe((event: ArrayListEvent<Item>)=> {
      if (event.type !== ArrayListEvent.REMOVE) return;
      expect(event.type).toEqual(ArrayListEvent.REMOVE);
      expect(event.list).toEqual(list);
      done();
    });
    const ITEM: Item = { id: 1 };
    list.addItem(ITEM);
    list.removeItem(ITEM);
  });
  
  it('change should dispatch a REMOVE event when removeItemAt() method is invoked', (done) => {
    subscription = list.change.subscribe((event: ArrayListEvent<Item>)=> {
      if (event.type !== ArrayListEvent.REMOVE) return;
      expect(event.type).toEqual(ArrayListEvent.REMOVE);
      expect(event.list).toEqual(list);
      done();
    });
    const ITEM: Item = { id: 1 };
    list.addItem(ITEM);
    list.removeItemAt(0);
  });
});
