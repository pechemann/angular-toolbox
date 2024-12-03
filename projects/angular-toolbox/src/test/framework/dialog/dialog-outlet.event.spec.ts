/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DialogBackdropType, DialogConfig, DialogOutletEvent } from "projects/angular-toolbox/src/public-api";

describe('DialogOutletEvent', () => {

    it('DialogOutletEvent.HIDE should should be "hide"', () => {
        expect(DialogOutletEvent.HIDE).toEqual("hide");
    });

    it('DialogOutletEvent.HIDE should should be "hide"', () => {
        expect(DialogOutletEvent.SHOW).toEqual("show");
    });

    it('should create a new instance', () => {
        const evt: DialogOutletEvent = new DialogOutletEvent(DialogOutletEvent.HIDE);
        expect(evt).toBeTruthy();
    });

    it('state should return the value passed to the constructor', () => {
        let evt: DialogOutletEvent = new DialogOutletEvent(DialogOutletEvent.HIDE);
        expect(evt.state).toEqual(DialogOutletEvent.HIDE);
        evt = new DialogOutletEvent(DialogOutletEvent.SHOW);
        expect(evt.state).toEqual(DialogOutletEvent.SHOW);
    });

    it('config should be null by default', () => {
        let evt: DialogOutletEvent = new DialogOutletEvent(DialogOutletEvent.HIDE);
        expect(evt.config).toBeNull();
    });

    it('config should return the value passed to the constructor', () => {
        const CFG: DialogConfig = {
            backdrop: DialogBackdropType.MODAL
        };
        const evt: DialogOutletEvent = new DialogOutletEvent(DialogOutletEvent.HIDE, CFG);
        expect(evt.config).toEqual(CFG);
    });
});