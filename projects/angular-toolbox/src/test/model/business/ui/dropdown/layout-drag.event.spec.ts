/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DropdownEvent, DropdownEventType } from "../../../../../lib/model";

describe('DropdownEvent', () => {

    let event: DropdownEvent;

    it('should create an instance', () => {
        const container: any = {};
        event = new DropdownEvent(container, DropdownEventType.TOGGLE, "open", "closed");
        expect(event).toBeTruthy();
    });
    
    it('target should be a reference to the object passed in the constructor', () => {
        const container: any = {};
        event = new DropdownEvent(container, DropdownEventType.TOGGLE, "open", "closed");
        expect(event.target).toBe(container);
    });
    
    it('type should be a reference to the object passed in the constructor', () => {
        const container: any = {};
        event = new DropdownEvent(container, DropdownEventType.TOGGLE, "open", "closed");
        expect(event.type).toBe(DropdownEventType.TOGGLE);
        event = new DropdownEvent(container, DropdownEventType.BEFORE_TOGGLE, "open", "closed");
        expect(event.type).toBe(DropdownEventType.BEFORE_TOGGLE);
    });

    it('newState should be a reference to the object passed in the constructor', () => {
        const container: any = {};
        event = new DropdownEvent(container, DropdownEventType.TOGGLE, "open", "closed");
        expect(event.newState).toEqual("open");
        event = new DropdownEvent(container, DropdownEventType.TOGGLE, "closed", "open");
        expect(event.newState).toEqual("closed");
    });
    

    it('oldState should be a reference to the object passed in the constructor', () => {
        const container: any = {};
        event = new DropdownEvent(container, DropdownEventType.TOGGLE, "open", "closed");
        expect(event.oldState).toEqual("closed");
        event = new DropdownEvent(container, DropdownEventType.TOGGLE, "closed", "open");
        expect(event.oldState).toEqual("open");
    });
});
