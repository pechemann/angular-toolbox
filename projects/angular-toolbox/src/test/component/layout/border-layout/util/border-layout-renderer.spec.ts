/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DOCUMENT } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BorderLayoutBoundsManager } from "projects/angular-toolbox/src/lib/component/layout/border-layout/util/border-layout-bounds-manager";
import { BorderLayoutRenderer } from "projects/angular-toolbox/src/lib/component/layout/border-layout/util/border-layout-renderer";
import { BorderLayoutContainer, LayoutDragEventType, LayoutRegion, SubscriptionService } from "projects/angular-toolbox/src/public-api";

describe('BorderLayoutRenderer', () => {

    let renderer: BorderLayoutRenderer;
    let service: SubscriptionService;
    let document: Document;
    let comp: ComponentFixture<BorderLayoutContainer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BorderLayoutContainer],
            providers: [SubscriptionService]
        })
        .compileComponents();
        service = TestBed.inject(SubscriptionService);
        document = TestBed.inject(DOCUMENT);
        comp = TestBed.createComponent(BorderLayoutContainer);
        renderer = new BorderLayoutRenderer(service, document);
    });

    afterEach(()=> {
        comp.destroy();
        document = null as any;
        comp = null as any;
        service = null as any;
        renderer.destroy();
        renderer = null as any;
    });

    it('should create a new instance', () => {
        expect(renderer).toBeTruthy();
    });
    
    it('getBoundsManager() should return a BorderLayoutBoundsManager instance', () => {
        expect(renderer.getBoundsManager()).toBeInstanceOf(BorderLayoutBoundsManager);
    });
    
    it('addContainers() should throw an error when 2 containers share the same region', () => {
        const containers: any = [];
        const comp1 = TestBed.createComponent(BorderLayoutContainer);
        comp1.componentInstance.constraints = { region: LayoutRegion.EAST };
        containers.push(comp1.componentInstance);
        const comp2 = TestBed.createComponent(BorderLayoutContainer);
        comp2.componentInstance.constraints = { region: LayoutRegion.EAST };
        containers.push(comp2.componentInstance);
        expect(()=> renderer.addContainers(containers)).toThrowError("A container with the same identifier has already been registered: " + LayoutRegion.EAST);
    });
    
    it('addContainers() should update the bounds of the BorderLayoutBoundsManager instance', () => {
        expect(renderer.getBoundsManager().getBounds().width).toEqual(0);
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST };
        containers.push(instance);
        renderer.addContainers(containers);
        // Must update the width with the default size:
        expect(renderer.getBoundsManager().getBounds().width).toEqual(100);
    });

    it('addContainers() should register event listeners for each container', () => {
        spyOn(service, "register");
        const containers: any = [];
        const comp1 = TestBed.createComponent(BorderLayoutContainer);
        comp1.componentInstance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(comp1.componentInstance);
        const comp2 = TestBed.createComponent(BorderLayoutContainer);
        comp2.componentInstance.constraints = { region: LayoutRegion.SOUTH };
        containers.push(comp2.componentInstance);
        const comp3 = TestBed.createComponent(BorderLayoutContainer);
        comp3.componentInstance.constraints = { region: LayoutRegion.NORTH, resizable: true };
        containers.push(comp3.componentInstance);
        renderer.addContainers(containers);
        expect(service.register).toHaveBeenCalledTimes(3);
    });

    it('paint() should throw an error if the main layout container has not been defined', () => {
        expect(()=> renderer.paint()).toThrowError("No layout container has been registered.");
    });
    
    it('paint() should update the size of the east container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        spyOn(instance, "setTopPos");
        spyOn(instance, "setRightPos");
        spyOn(instance, "setLeftPos");
        spyOn(instance, "setBottomPos");
        instance.constraints = { region: LayoutRegion.EAST };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(instance.setTopPos).toHaveBeenCalled();
        expect(instance.setRightPos).not.toHaveBeenCalled();
        expect(instance.setLeftPos).toHaveBeenCalled();
        expect(instance.setBottomPos).toHaveBeenCalled();
    });
    
    it('paint() should update the size of the west container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        spyOn(instance, "setTopPos");
        spyOn(instance, "setRightPos");
        spyOn(instance, "setLeftPos");
        spyOn(instance, "setBottomPos");
        instance.constraints = { region: LayoutRegion.WEST };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(instance.setTopPos).toHaveBeenCalled();
        expect(instance.setLeftPos).not.toHaveBeenCalled();
        expect(instance.setRightPos).toHaveBeenCalled();
        expect(instance.setBottomPos).toHaveBeenCalled();
    });
    
    it('paint() should update the size of the center container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        spyOn(instance, "setTopPos");
        spyOn(instance, "setRightPos");
        spyOn(instance, "setLeftPos");
        spyOn(instance, "setBottomPos");
        instance.constraints = { region: LayoutRegion.CENTER };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(instance.setTopPos).toHaveBeenCalled();
        expect(instance.setLeftPos).toHaveBeenCalled();
        expect(instance.setRightPos).toHaveBeenCalled();
        expect(instance.setBottomPos).toHaveBeenCalled();
    });
    
    it('paint() should not update the size of the north container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        spyOn(instance, "setTopPos");
        spyOn(instance, "setRightPos");
        spyOn(instance, "setLeftPos");
        spyOn(instance, "setBottomPos");
        instance.constraints = { region: LayoutRegion.NORTH };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(instance.setTopPos).not.toHaveBeenCalled();
        expect(instance.setLeftPos).not.toHaveBeenCalled();
        expect(instance.setRightPos).not.toHaveBeenCalled();
        expect(instance.setBottomPos).not.toHaveBeenCalled();
    });
    
    it('paint() should not update the size of the south container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        spyOn(instance, "setTopPos");
        spyOn(instance, "setRightPos");
        spyOn(instance, "setLeftPos");
        spyOn(instance, "setBottomPos");
        instance.constraints = { region: LayoutRegion.SOUTH };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(instance.setTopPos).not.toHaveBeenCalled();
        expect(instance.setLeftPos).not.toHaveBeenCalled();
        expect(instance.setRightPos).not.toHaveBeenCalled();
        expect(instance.setBottomPos).not.toHaveBeenCalled();
    });

    it('paint() should get the measures from the BorderLayoutBoundsManager instance', () => {
        const boundsManager = renderer.getBoundsManager();
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST };
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        spyOn(boundsManager, "getBounds").and.returnValue(new DOMRect());
        renderer.paint();
        expect(boundsManager.getBounds).toHaveBeenCalled();
    });
    
    it('resizing a container should use the layout container bounds as reference', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(layoutContainer, "getBoundingClientRect").and.returnValue(new DOMRect());
        instance.resizeStart.emit(instance);
        expect(layoutContainer.getBoundingClientRect).toHaveBeenCalled();
    });
    
    it('resizing a container should update the coordinates of the BorderLayoutBoundsManager instance', () => {
        const boundsManager = renderer.getBoundsManager();
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(boundsManager, "setOrigin");
        instance.resizeStart.emit(instance);
        expect(boundsManager.setOrigin).toHaveBeenCalled();
    });
    
    it('resizing a container should get the correct resize method', () => {
        const boundsManager = renderer.getBoundsManager();
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(boundsManager, "getResizeMethod");
        instance.resizeStart.emit(instance);
        expect(boundsManager.getResizeMethod).toHaveBeenCalledWith(LayoutRegion.EAST);
    });
    
    it('resizing a container should add event listeners to the layout container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(document, "addEventListener");
        instance.resizeStart.emit(instance);
        expect(document.addEventListener).toHaveBeenCalledTimes(2);
    });
    
    it('resizing a container should update the container size', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(instance, "setSize");
        instance.resizeStart.emit(instance);
        document.dispatchEvent(new MouseEvent("mousemove"));
        expect(instance.setSize).toHaveBeenCalled();
    });
    
    it('resizing a container should update the container position', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        spyOn(instance, "setTopPos");
        spyOn(instance, "setLeftPos");
        spyOn(instance, "setBottomPos");
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        instance.resizeStart.emit(instance);
        document.dispatchEvent(new MouseEvent("mousemove"));
        expect(instance.setTopPos).toHaveBeenCalled();
        expect(instance.setLeftPos).toHaveBeenCalled();
        expect(instance.setBottomPos).toHaveBeenCalled();
    });
    
    it('stopping resizing a container should update the container size', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(instance, "setSize");
        instance.resizeStart.emit(instance);
        document.dispatchEvent(new MouseEvent("mouseup"));
        expect(instance.setSize).toHaveBeenCalled();
    });
    
    it('stopping resizing a container should update the container position', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        spyOn(instance, "setTopPos");
        spyOn(instance, "setLeftPos");
        spyOn(instance, "setBottomPos");
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        instance.resizeStart.emit(instance);
        document.dispatchEvent(new MouseEvent("mouseup"));
        expect(instance.setTopPos).toHaveBeenCalled();
        expect(instance.setLeftPos).toHaveBeenCalled();
        expect(instance.setBottomPos).toHaveBeenCalled();
    });

    it('start resizing a container should emit a LayoutDragEvent of type DRAG_START', (done) => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        const sub = renderer.userAction.subscribe(event=> {
            expect(event.type).toEqual(LayoutDragEventType.DRAG_START);
            expect(event.target).toBe(instance);
            sub.unsubscribe();
            done();
        });
        instance.resizeStart.emit(instance);
    });
    
    it('resizing a container should emit a LayoutDragEvent of type DRAGGING', (done) => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        instance.resizeStart.emit(instance);
        const sub = renderer.userAction.subscribe(event=> {
            expect(event.type).toEqual(LayoutDragEventType.DRAGGING);
            expect(event.target).toBe(instance);
            sub.unsubscribe();
            done();
        });
        document.dispatchEvent(new MouseEvent("mousemove"));
    });
    
    it('stopping resizing a container should emit a LayoutDragEvent of type DRAG_STOP', (done) => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        instance.resizeStart.emit(instance);
        const sub = renderer.userAction.subscribe(event=> {
            sub.unsubscribe();
            expect(event.type).toEqual(LayoutDragEventType.DRAG_STOP);
            expect(event.target).toBe(instance);
            done();
        });
        document.dispatchEvent(new MouseEvent("mouseup"));
    });
    
    it('start resizing a container should set the container selected property to true', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        expect(instance.selected).toBeFalse();
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        instance.resizeStart.emit(instance);
        expect(instance.selected).toBeTrue();
    });
    
    it('stopping resizing a container should set the container selected property to false', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        instance.resizeStart.emit(instance);
        document.dispatchEvent(new MouseEvent("mouseup"));
        expect(instance.selected).toBeFalse();
    });

    it('resizeRegion() should return false if the region is LayoutRegion.CENTER', () => {
        expect(renderer.resizeRegion(LayoutRegion.CENTER, 100)).toBeFalse();
    });

    it('resizeRegion() should return false if the region does not exists', () => {
        expect(renderer.resizeRegion(LayoutRegion.EAST, 100)).toBeFalse();
    });

    it('resizeRegion() should throw an error if the main layout container has not been defined', () => {
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST };
        containers.push(instance);
        renderer.addContainers(containers);
        const invalidAction = ()=> {
            renderer.resizeRegion(LayoutRegion.EAST, 100)
        };
        expect(invalidAction).toThrowError("No layout container has been registered.");
    });

    it('resizeRegion() should return true if the region exists', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        renderer.setLayoutContainer(layoutContainer);
        instance.constraints = { region: LayoutRegion.EAST };
        containers.push(instance);
        renderer.addContainers(containers);
        expect(renderer.resizeRegion(LayoutRegion.EAST, 100)).toBeTrue();
    });
    
    it('resizeRegion() should update the size of the container for the specified region', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        renderer.setLayoutContainer(layoutContainer);
        instance.constraints = { region: LayoutRegion.EAST };
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.resizeRegion(LayoutRegion.EAST, 300);
        expect(instance.getSize()).toEqual(300);
    });
    
    // Impossible to test
    /*
    it('resizing a container should throw an error if the main layout container has not been defined', () => {
        const containers: any = [];
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.addContainers(containers);
        const invalidAction = ()=> {
            instance.resizeStart.emit(instance);
        };
        expect(invalidAction).toThrowError("No layout container has been registered.");
    });
    */

    it('setConstraints() should hrow an error if the region cannot be associated with a container', () => {
        const invalidAction = ()=> {
            renderer.setConstraints( { region: LayoutRegion.EAST });
        }
        expect(invalidAction).toThrow();
    });
    
    it('setConstraints() should invoke the paint() method', () => {
        const containers: any = [];
        const instance = comp.componentInstance;
        spyOn(renderer, "paint");
        instance.constraints = { region: LayoutRegion.EAST };
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.setConstraints( { region: LayoutRegion.EAST, resizable: false });
        expect(renderer.paint).toHaveBeenCalled();
    });

    it('setConstraints() should update the constraints of the target container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        renderer.setLayoutContainer(layoutContainer);
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.addContainers(containers);
        expect(instance.constraints.resizable).toBeTrue();
        renderer.setConstraints( { region: LayoutRegion.EAST, resizable: false });
        expect(instance.constraints.resizable).toBeFalse();
    });

    it('setConstraints() should not invoke the container.getSize() method if the size is specified', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        renderer.setLayoutContainer(layoutContainer);
        instance.constraints = { region: LayoutRegion.EAST };
        containers.push(instance);
        renderer.addContainers(containers);
        spyOn(instance, "getSize")
        renderer.setConstraints( { region: LayoutRegion.EAST, size: 80 });
        expect(instance.getSize).not.toHaveBeenCalled();
    });

    it('setConstraints() should invoke the container.getSize() method if the size is not specified', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        renderer.setLayoutContainer(layoutContainer);
        instance.constraints = { region: LayoutRegion.EAST, size: 80 };
        containers.push(instance);
        renderer.addContainers(containers);
        spyOn(instance, "getSize")
        renderer.setConstraints( { region: LayoutRegion.EAST });
        expect(instance.getSize).toHaveBeenCalled();
    });

    it('setConstraints() should update the container size', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        renderer.setLayoutContainer(layoutContainer);
        instance.constraints = { region: LayoutRegion.EAST, size: 10 };
        expect(instance.getSize()).toEqual(10);
        containers.push(instance);
        renderer.addContainers(containers);
        renderer.setConstraints( { region: LayoutRegion.EAST, size: 180 } );
        expect(instance.getSize()).toEqual(180);
    });

    it('getBorderLayoutContainer() should return undefined when no container with the specified region exists', () => {
        expect(renderer.getBorderLayoutContainer(LayoutRegion.EAST)).toBeUndefined();
    });

    it('getBorderLayoutContainer() should return the BorderLayoutContainer instance associated with the specified region', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const instance = comp.componentInstance;
        renderer.setLayoutContainer(layoutContainer);
        instance.constraints = { region: LayoutRegion.EAST, size: 10 };
        containers.push(instance);
        renderer.addContainers(containers);
        const childContainer = renderer.getBorderLayoutContainer(LayoutRegion.EAST);
        expect(childContainer).toBeInstanceOf(BorderLayoutContainer);
        expect(childContainer?.constraints.region).toEqual(LayoutRegion.EAST);
    });
});

describe('BorderLayoutRenderer: destroy() method', () => {

    let renderer: BorderLayoutRenderer;
    let service: SubscriptionService;
    let document: Document;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BorderLayoutContainer],
            providers: [SubscriptionService]
        })
        .compileComponents();
        service = TestBed.inject(SubscriptionService);
        document = TestBed.inject(DOCUMENT);
        renderer = new BorderLayoutRenderer(service, document);
    });
    
    it('destroy() should delete the BorderLayoutBoundsManager instance', () => {
        renderer.destroy();
        expect(renderer.getBoundsManager()).toBeNull();
    });

    it('destroy() should remove all registered events', () => {
        spyOn(service, "clearAll");
        renderer.destroy();
        expect(service.clearAll).toHaveBeenCalledOnceWith(renderer);
    });
});


// Impossible to test outside a fdescribe test suite
/*
fdescribe('BorderLayoutRenderer: remove document events after resizing', () => {
    
    let renderer: BorderLayoutRenderer;
    let service: SubscriptionService;
    let document: Document;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BorderLayoutContainer],
            providers: [SubscriptionService]
        })
        .compileComponents();
        service = TestBed.inject(SubscriptionService);
        document = TestBed.inject(DOCUMENT);
        renderer = new BorderLayoutRenderer(service, document);
    });

    it('stopping resizing should remove all registered event listeners', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        const instance = comp.componentInstance;
        spyOn(document,'removeEventListener');
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        instance.resizeStart.emit(instance);
        document.dispatchEvent(new MouseEvent("mouseup"));
        expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    });
});
*/

// Impossible to test outside a fdescribe test suite
/*
fdescribe('BorderLayoutRenderer:  document events after destroy() invokation', () => {

    let renderer: BorderLayoutRenderer;
    let service: SubscriptionService;
    let document: Document;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BorderLayoutContainer],
            providers: [SubscriptionService]
        })
        .compileComponents();
        service = TestBed.inject(SubscriptionService);
        document = TestBed.inject(DOCUMENT);
        renderer = new BorderLayoutRenderer(service, document);
    });
    
    it('destroy() should remove all registered event listeners', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        const instance = comp.componentInstance;
        spyOn(document, 'removeEventListener');
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        instance.resizeStart.emit(instance);
        renderer.destroy();
        expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    });
});
*/
