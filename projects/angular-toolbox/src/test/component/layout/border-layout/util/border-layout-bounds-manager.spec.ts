/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BorderLayoutBoundsManager } from "projects/angular-toolbox/src/lib/component/layout/border-layout/util/border-layout-bounds-manager";
import { LayoutRegion } from "projects/angular-toolbox/src/public-api";

describe('BorderLayoutBoundsManager', () => {

    let manager: BorderLayoutBoundsManager;
    const getFakeContainer = (region: LayoutRegion, size: number): any=> {
        return {
            constraints: { region: region },
            getSize: ()=> size
        };
    };

    beforeEach(async () => {
        manager = new BorderLayoutBoundsManager();
    });

    afterEach(() => {
        manager.destroy();
        manager = null as any;
    });

    it('should create a new instance', () => {
        expect(manager).toBeTruthy();
    });

    it('getBounds() should return a DOMRect instance', () => {
        expect(manager.getBounds()).toBeInstanceOf(DOMRect);
    });

    it('getResizeMethod() should return the correct ResizeMethod reference', () => {
        expect(manager.getResizeMethod(LayoutRegion.NORTH).name).toEqual(manager.northResize.bind(manager).name);
        expect(manager.getResizeMethod(LayoutRegion.SOUTH).name).toEqual(manager.southResize.bind(manager).name);
        expect(manager.getResizeMethod(LayoutRegion.WEST).name).toEqual(manager.westResize.bind(manager).name);
        expect(manager.getResizeMethod(LayoutRegion.EAST).name).toEqual(manager.eastResize.bind(manager).name);
        // defalut value is southResize:
        expect(manager.getResizeMethod(LayoutRegion.CENTER).name).toEqual(manager.southResize.bind(manager).name);
    });

    it('initBounds() should update the bounds of the manager', () => {
        manager.initBounds(getFakeContainer(LayoutRegion.NORTH, 20));
        expect(manager.getBounds().y).toEqual(20);
        manager.initBounds(getFakeContainer(LayoutRegion.SOUTH, 40));
        expect(manager.getBounds().height).toEqual(40);
        manager.initBounds(getFakeContainer(LayoutRegion.WEST, 60));
        expect(manager.getBounds().x).toEqual(60);
        manager.initBounds(getFakeContainer(LayoutRegion.EAST, 80));
        expect(manager.getBounds().width).toEqual(80);
    });

    it('setOrigin() should update the manager top-left-hand corner coordinates', () => {
        let origin = manager.getOrigin();
        expect(origin.x).toEqual(0);
        expect(origin.y).toEqual(0);
        manager.setOrigin(10, 30);
        origin = manager.getOrigin();
        expect(origin.x).toEqual(10);
        expect(origin.y).toEqual(30);
    });

    it('destoy() should delete the bounds', () => {
        manager.destroy();
        expect(manager.getBounds()).toBeNull();
    });
});

describe('BorderLayoutBoundsManager: resizing methods', () => {

    let manager: BorderLayoutBoundsManager;

    const getfakeEvt = (x: number = 0, y: number = 0): any=> {
        return {
            clientX: x,
            clientY: y
        };
    };

    beforeEach(async () => {
        manager = new BorderLayoutBoundsManager();
    });

    afterEach(() => {
        manager.destroy();
        manager = null as any;
    });

    it('northResize() should update size from the origin and the mouse position only', () => {
        manager.setOrigin(10, 30);
        let size = manager.northResize(getfakeEvt(60, 40), 0, 0, 0, 0);
        expect(manager.northResize(getfakeEvt(60, 40), 100, 100, 0, 0)).toEqual(size);
    });

    it('northResize() should update only the bound.y property with the computed size', () => {
        manager.setOrigin(10, 30);
        let size = manager.northResize(getfakeEvt(60, 40), 0, 0, 0, 0);
        expect(manager.getBounds().y).toEqual(size);
        expect(manager.getBounds().x).toEqual(0);
        expect(manager.getBounds().height).toEqual(0);
        expect(manager.getBounds().width).toEqual(0);
    });

    it('northResize() should use the minSize value when the computed size is lower than minSize', () => {
        manager.setOrigin(10, 30);
        let size = manager.northResize(getfakeEvt(60, 40), 0, 0, 500, 0);
        expect(size).toEqual(500);
    });

    it('northResize() should use the maxSize value when the computed size is greater than maxSize', () => {
        manager.setOrigin(10, 30);
        let size = manager.northResize(getfakeEvt(60, 240), 0, 0, 0, 100);
        expect(size).toEqual(100);
    });
    
    it('westResize() should update size from the origin and the mouse position only', () => {
        manager.setOrigin(10, 30);
        let size = manager.westResize(getfakeEvt(60, 40), 0, 0, 0, 0);
        expect(manager.westResize(getfakeEvt(60, 40), 100, 100, 0, 0)).toEqual(size);
    });

    it('westResize() should update only the bound.y property with the computed size', () => {
        manager.setOrigin(10, 30);
        let size = manager.westResize(getfakeEvt(60, 40), 0, 0, 0, 0);
        expect(manager.getBounds().y).toEqual(0);
        expect(manager.getBounds().x).toEqual(size);
        expect(manager.getBounds().height).toEqual(0);
        expect(manager.getBounds().width).toEqual(0);
    });

    it('westResize() should use the minSize value when the computed size is lower than minSize', () => {
        manager.setOrigin(10, 30);
        let size = manager.westResize(getfakeEvt(60, 40), 0, 0, 500, 0);
        expect(size).toEqual(500);
    });

    it('westResize() should use the maxSize value when the computed size is greater than maxSize', () => {
        manager.setOrigin(10, 30);
        let size = manager.westResize(getfakeEvt(240, 60), 0, 0, 0, 100);
        expect(size).toEqual(100);
    });
    
    it('southResize() should update size from the origin, the height and the mouse position only', () => {
        manager.setOrigin(10, 30);
        let size = manager.southResize(getfakeEvt(60, 40), 0, 100, 0, 0);
        expect(manager.southResize(getfakeEvt(60, 40), 100, 100, 0, 0)).toEqual(size);
    });

    it('southResize() should update only the bound.height property with the computed size', () => {
        manager.setOrigin(10, 30);
        let size = manager.southResize(getfakeEvt(60, 40), 0, 100, 0, 0);
        expect(manager.getBounds().height).toEqual(size);
        expect(manager.getBounds().x).toEqual(0);
        expect(manager.getBounds().y).toEqual(0);
        expect(manager.getBounds().width).toEqual(0);
    });

    it('southResize() should use the minSize value when the computed size is lower than minSize', () => {
        manager.setOrigin(10, 30);
        let size = manager.southResize(getfakeEvt(60, 40), 0, 0, 500, 0);
        expect(size).toEqual(500);
    });

    it('southResize() should use the maxSize value when the computed size is greater than maxSize', () => {
        manager.setOrigin(10, 30);
        let size = manager.southResize(getfakeEvt(60, 40), 0, 200, 0, 100);
        expect(size).toEqual(100);
    });

    it('eastResize() should update size from the origin, the width and the mouse position only', () => {
        manager.setOrigin(10, 30);
        let size = manager.eastResize(getfakeEvt(60, 40), 100, 0, 0, 0);
        expect(manager.eastResize(getfakeEvt(60, 40), 100, 100, 0, 0)).toEqual(size);
    });

    it('eastResize() should update only the bound.width property with the computed size', () => {
        manager.setOrigin(10, 30);
        let size = manager.eastResize(getfakeEvt(60, 40), 0, 100, 0, 0);
        expect(manager.getBounds().height).toEqual(0);
        expect(manager.getBounds().x).toEqual(0);
        expect(manager.getBounds().y).toEqual(0);
        expect(manager.getBounds().width).toEqual(size);
    });

    it('eastResize() should use the minSize value when the computed size is lower than minSize', () => {
        manager.setOrigin(10, 30);
        let size = manager.eastResize(getfakeEvt(60, 40), 0, 0, 500, 0);
        expect(size).toEqual(500);
    });

    it('eastResize() should use the maxSize value when the computed size is greater than maxSize', () => {
        manager.setOrigin(10, 30);
        let size = manager.eastResize(getfakeEvt(60, 40), 200, 0, 0, 100);
        expect(size).toEqual(100);
    });
});