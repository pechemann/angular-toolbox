import { EventTargetImpl } from '../../../../../lib/framework/mock/http/event/event-target.impl';

describe('EventTargetImpl', () => {

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
});

