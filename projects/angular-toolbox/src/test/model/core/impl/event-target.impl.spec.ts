import { EventTargetImpl } from '../../../../lib/model/core/impl/event-target.impl';

describe('EventTargetImpl', () => {

  let evtTgt: EventTargetImpl;

  beforeEach(() => {
    evtTgt = new EventTargetImpl();
  });

  it('should create an instance', () => {
    expect(evtTgt).toBeTruthy();
  });
});
