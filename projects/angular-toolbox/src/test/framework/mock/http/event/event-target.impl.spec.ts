/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EventTargetImpl } from '../../../../../lib/framework/mock/http/event/event-target.impl';

describe('EventTargetImpl', () => {

  const CUSTOM_EVENT_TYPE: string = "customEvent";
  const ANOTHER_EVENT_TYPE: string = "anotherEventType";
  const HELLO_WORLD: string = "Hello World";
  const listener1 = (event: Event)=> console.log(event.type);
  const listener2 = (event: Event)=> console.log(event.type);
  const listener3 = (event: Event)=> console.log(event.type);
  const listener4 = {
    handleEvent: (event: Event)=> {
      console.log(HELLO_WORLD);
    }
  };

  let evtTgt: EventTargetImpl;

  beforeEach(() => {
    evtTgt = new EventTargetImpl();
  });

  it('should create an instance', () => {
    expect(evtTgt).toBeTruthy();
  });

  it('addEventListener() should throw a TypeError when no arguments are provided', () => {
    expect(()=> (evtTgt as any).addEventListener()).toThrowError("TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but 0 present.");
  });

  it('addEventListener() should throw a TypeError when only one arguments is provided', () => {
    expect(()=> (evtTgt as any).addEventListener("event")).toThrowError("TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only 1 present.");
  });

  it('removeEventListener() should throw a TypeError when no arguments are provided', () => {
    expect(()=> (evtTgt as any).removeEventListener()).toThrowError("TypeError: Failed to execute 'removeEventListener' on 'EventTarget': 2 arguments required, but 0 present.");
  });

  it('removeEventListener() should throw a TypeError when only one arguments is provided', () => {
    expect(()=> (evtTgt as any).removeEventListener("event")).toThrowError("TypeError: Failed to execute 'removeEventListener' on 'EventTarget': 2 arguments required, but only 1 present.");
  });
  
  it('dispatchEvent() should throw a TypeError when the "event" argument is not an Event instance', () => {
    expect(()=> (evtTgt as any).dispatchEvent({})).toThrowError("Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.");
  });

  it('dispatchEvent() should return true even if no listeners are registered', () => {
    expect(evtTgt.dispatchEvent(new Event(CUSTOM_EVENT_TYPE))).toBeTrue();
  });

  it('dispatchEvent() should invoke only event listeners registered for this event', () => {
    spyOn(console, 'log');
    evtTgt.addEventListener(CUSTOM_EVENT_TYPE, listener1);
    evtTgt.addEventListener(ANOTHER_EVENT_TYPE, listener2);
    evtTgt.addEventListener(CUSTOM_EVENT_TYPE, listener3);
    evtTgt.dispatchEvent(new Event(CUSTOM_EVENT_TYPE));
    expect(console.log).toHaveBeenCalledWith(CUSTOM_EVENT_TYPE);
    expect(console.log).toHaveBeenCalledTimes(2);
    evtTgt.removeEventListener(CUSTOM_EVENT_TYPE, listener1);
    evtTgt.removeEventListener(ANOTHER_EVENT_TYPE, listener2);
    evtTgt.removeEventListener(CUSTOM_EVENT_TYPE, listener3);
  });
  
  it('removeEventListener() should remove the specified event listeners', () => {
    spyOn(console, 'log');
    evtTgt.addEventListener(CUSTOM_EVENT_TYPE, listener1);
    evtTgt.removeEventListener(CUSTOM_EVENT_TYPE, listener1);
    evtTgt.dispatchEvent(new Event(CUSTOM_EVENT_TYPE));
    expect(console.log).not.toHaveBeenCalled();
  });

  it('options.once should invoke the specified listener only one time', () => {
    spyOn(console, 'log');
    evtTgt.addEventListener(CUSTOM_EVENT_TYPE, listener1, { once: true });
    evtTgt.dispatchEvent(new Event(CUSTOM_EVENT_TYPE));
    evtTgt.dispatchEvent(new Event(CUSTOM_EVENT_TYPE));
    expect(console.log).toHaveBeenCalledOnceWith(CUSTOM_EVENT_TYPE);
    evtTgt.removeEventListener(CUSTOM_EVENT_TYPE, listener1);
  });
  
  it('listener.handleEvent() should be invoked with embeded properties', () => {
    spyOn(console, 'log');
    evtTgt.addEventListener(CUSTOM_EVENT_TYPE, listener4);
    evtTgt.dispatchEvent(new Event(CUSTOM_EVENT_TYPE));
    expect(console.log).toHaveBeenCalledOnceWith(HELLO_WORLD);
    evtTgt.removeEventListener(CUSTOM_EVENT_TYPE, listener4);
  });
  
  it('hasEventListener() should return false no event is registered for the specified type', () => {
    expect(evtTgt.hasEventListener(CUSTOM_EVENT_TYPE)).toBeFalse();
  });
  
  it('hasEventListener() should return true when an event is registered for the specified type', () => {
    evtTgt.addEventListener(CUSTOM_EVENT_TYPE, listener1);
    expect(evtTgt.hasEventListener(CUSTOM_EVENT_TYPE)).toBeTrue();
    evtTgt.removeEventListener(CUSTOM_EVENT_TYPE, listener1);
  });
  
  it('hasEventListener() should return false when a registered event of the specified type has been removed', () => {
    evtTgt.addEventListener(CUSTOM_EVENT_TYPE, listener1);
    evtTgt.removeEventListener(CUSTOM_EVENT_TYPE, listener1);
    expect(evtTgt.hasEventListener(CUSTOM_EVENT_TYPE)).toBeFalse();
  });
  
  it('hasEventListener() should return false when a registered event of the specified type, with options.once set to true, has been removed', () => {
    evtTgt.addEventListener(CUSTOM_EVENT_TYPE, listener1, { once: true });
    evtTgt.dispatchEvent(new Event(CUSTOM_EVENT_TYPE));
    expect(evtTgt.hasEventListener(CUSTOM_EVENT_TYPE)).toBeFalse();
  });
});

