import { EventTargetImpl } from '../../../../../lib/model/business/impl/event/event-target.impl';

describe('EventTargetImpl', () => {

  let evtTgt: EventTargetImpl;

  beforeEach(() => {
    evtTgt = new EventTargetImpl();
  });

  it('should create an instance', () => {
    expect(evtTgt).toBeTruthy();
  });
});
