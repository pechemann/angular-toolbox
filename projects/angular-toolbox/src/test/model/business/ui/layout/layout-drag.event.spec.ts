/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LayoutDragEvent, LayoutDragEventType } from "../../../../../lib/model";

describe('LayoutDragEvent', () => {

    let event: LayoutDragEvent;

    it('should create an instance', () => {
        const container: any = {};
        event = new LayoutDragEvent(container, LayoutDragEventType.DRAGGING);
        expect(event).toBeTruthy();
    });
    
    it('target should be a reference to the object passed in the constructor', () => {
        const container: any = {};
        event = new LayoutDragEvent(container, LayoutDragEventType.DRAGGING);
        expect(event.target).toBe(container);
    });
    
    it('type should be a reference to the object passed in the constructor', () => {
        const container: any = {};
        event = new LayoutDragEvent(container, LayoutDragEventType.DRAG_START);
        expect(event.type).toBe(LayoutDragEventType.DRAG_START);
        event = new LayoutDragEvent(container, LayoutDragEventType.DRAG_STOP);
        expect(event.type).toBe(LayoutDragEventType.DRAG_STOP);
    });

    it('layout should be undefined by default', () => {
        const container: any = {};
        event = new LayoutDragEvent(container, LayoutDragEventType.DRAG_START);
        expect(event.layout).toBeUndefined();
    });
});
