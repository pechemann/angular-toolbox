/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from "@angular/core/testing";
import { BorderLayoutBoundsManager } from "projects/angular-toolbox/src/lib/component/layout/border-layout/util/border-layout-bounds-manager";
import { BorderLayoutRenderer } from "projects/angular-toolbox/src/lib/component/layout/border-layout/util/border-layout-renderer";
import { BorderLayoutContainer, LayoutRegion, SubscriptionService } from "projects/angular-toolbox/src/public-api";

describe('BorderLayoutRenderer', () => {

    let renderer: BorderLayoutRenderer;
    let service: SubscriptionService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BorderLayoutContainer],
            providers: [SubscriptionService]
        })
        .compileComponents();
        service = TestBed.inject(SubscriptionService);
        renderer = new BorderLayoutRenderer(service);
    });

    afterEach(() => {
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
        const comp = TestBed.createComponent(BorderLayoutContainer);
        comp.componentInstance.constraints = { region: LayoutRegion.EAST };
        containers.push(comp.componentInstance);
        renderer.addContainers(containers);
        // Must update the width with the default size:
        expect(renderer.getBoundsManager().getBounds().width).toEqual(100);
    });

    it('addContainers() should register event listeners for each resizable container', () => {
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
        expect(service.register).toHaveBeenCalledTimes(2);
    });

    it('paint() should throw an error if the main layout container has not been defined', () => {
        expect(()=> renderer.paint()).toThrowError("No layout container has been registered.");
    });
    
    it('paint() should update the size of the east container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer).componentInstance;
        spyOn(comp, "setTopPos");
        spyOn(comp, "setRightPos");
        spyOn(comp, "setLeftPos");
        spyOn(comp, "setBottomPos");
        comp.constraints = { region: LayoutRegion.EAST };
        containers.push(comp);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(comp.setTopPos).toHaveBeenCalled();
        expect(comp.setRightPos).not.toHaveBeenCalled();
        expect(comp.setLeftPos).toHaveBeenCalled();
        expect(comp.setBottomPos).toHaveBeenCalled();
    });
    
    it('paint() should update the size of the west container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer).componentInstance;
        spyOn(comp, "setTopPos");
        spyOn(comp, "setRightPos");
        spyOn(comp, "setLeftPos");
        spyOn(comp, "setBottomPos");
        comp.constraints = { region: LayoutRegion.WEST };
        containers.push(comp);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(comp.setTopPos).toHaveBeenCalled();
        expect(comp.setLeftPos).not.toHaveBeenCalled();
        expect(comp.setRightPos).toHaveBeenCalled();
        expect(comp.setBottomPos).toHaveBeenCalled();
    });
    
    it('paint() should update the size of the center container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer).componentInstance;
        spyOn(comp, "setTopPos");
        spyOn(comp, "setRightPos");
        spyOn(comp, "setLeftPos");
        spyOn(comp, "setBottomPos");
        comp.constraints = { region: LayoutRegion.CENTER };
        containers.push(comp);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(comp.setTopPos).toHaveBeenCalled();
        expect(comp.setLeftPos).toHaveBeenCalled();
        expect(comp.setRightPos).toHaveBeenCalled();
        expect(comp.setBottomPos).toHaveBeenCalled();
    });
    
    it('paint() should not update the size of the north container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer).componentInstance;
        spyOn(comp, "setTopPos");
        spyOn(comp, "setRightPos");
        spyOn(comp, "setLeftPos");
        spyOn(comp, "setBottomPos");
        comp.constraints = { region: LayoutRegion.NORTH };
        containers.push(comp);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(comp.setTopPos).not.toHaveBeenCalled();
        expect(comp.setLeftPos).not.toHaveBeenCalled();
        expect(comp.setRightPos).not.toHaveBeenCalled();
        expect(comp.setBottomPos).not.toHaveBeenCalled();
    });
    
    it('paint() should not update the size of the south container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer).componentInstance;
        spyOn(comp, "setTopPos");
        spyOn(comp, "setRightPos");
        spyOn(comp, "setLeftPos");
        spyOn(comp, "setBottomPos");
        comp.constraints = { region: LayoutRegion.SOUTH };
        containers.push(comp);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        renderer.paint();
        expect(comp.setTopPos).not.toHaveBeenCalled();
        expect(comp.setLeftPos).not.toHaveBeenCalled();
        expect(comp.setRightPos).not.toHaveBeenCalled();
        expect(comp.setBottomPos).not.toHaveBeenCalled();
    });

    it('paint() should get the measures from the BorderLayoutBoundsManager instance', () => {
        const boundsManager = renderer.getBoundsManager();
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        comp.componentInstance.constraints = { region: LayoutRegion.EAST };
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        spyOn(boundsManager, "getBounds").and.returnValue(new DOMRect());
        renderer.paint();
        expect(boundsManager.getBounds).toHaveBeenCalled();
    });
    
    it('resizing a container should throw an error if the main layout container has not been defined', () => {
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        comp.componentInstance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(comp.componentInstance);
        renderer.addContainers(containers);
        const userAction = ()=> {
            comp.componentInstance.resizeStart.emit(comp.componentInstance);
        };
        //expect(userAction).toThrowError("No layout container has been registered.");
    });
    
    it('resizing a container should use the layout container bounds as reference', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        comp.componentInstance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(comp.componentInstance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(layoutContainer, "getBoundingClientRect").and.returnValue(new DOMRect());
        comp.componentInstance.resizeStart.emit(comp.componentInstance);
        expect(layoutContainer.getBoundingClientRect).toHaveBeenCalled();
    });
    
    it('resizing a container should update the coordinates of the BorderLayoutBoundsManager instance', () => {
        const boundsManager = renderer.getBoundsManager();
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        comp.componentInstance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(comp.componentInstance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(boundsManager, "setOrigin");
        comp.componentInstance.resizeStart.emit(comp.componentInstance);
        expect(boundsManager.setOrigin).toHaveBeenCalled();
    });
    
    it('resizing a container should get the correct resize method', () => {
        const boundsManager = renderer.getBoundsManager();
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        comp.componentInstance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(comp.componentInstance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(boundsManager, "getResizeMethod");
        comp.componentInstance.resizeStart.emit(comp.componentInstance);
        expect(boundsManager.getResizeMethod).toHaveBeenCalledWith(LayoutRegion.EAST);
    });
    
    it('resizing a container should add event listeners to the layout container', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        comp.componentInstance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(comp.componentInstance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(layoutContainer, "addEventListener");
        comp.componentInstance.resizeStart.emit(comp.componentInstance);
        expect(layoutContainer.addEventListener).toHaveBeenCalledTimes(2);
    });
    
    it('resizing a container should update the container size', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        comp.componentInstance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(comp.componentInstance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(comp.componentInstance, "setSize");
        comp.componentInstance.resizeStart.emit(comp.componentInstance);
        layoutContainer.dispatchEvent(new MouseEvent("mousemove"));
        expect(comp.componentInstance.setSize).toHaveBeenCalled();
    });
    
    it('resizing a container should update the container position', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        spyOn(instance, "setTopPos");
        spyOn(instance, "setLeftPos");
        spyOn(instance, "setBottomPos");
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        comp.componentInstance.resizeStart.emit(instance);
        layoutContainer.dispatchEvent(new MouseEvent("mousemove"));
        expect(instance.setTopPos).toHaveBeenCalled();
        expect(instance.setLeftPos).toHaveBeenCalled();
        expect(instance.setBottomPos).toHaveBeenCalled();
    });
    
    it('stoping resizing a container should update the container size', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        comp.componentInstance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(comp.componentInstance);
        renderer.addContainers(containers);
        renderer.setLayoutContainer(layoutContainer);
        spyOn(comp.componentInstance, "setSize");
        comp.componentInstance.resizeStart.emit(comp.componentInstance);
        layoutContainer.dispatchEvent(new MouseEvent("mouseup"));
        expect(comp.componentInstance.setSize).toHaveBeenCalled();
    });
    
    it('stoping resizing a container should update the container position', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        const instance = comp.componentInstance;
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        spyOn(instance, "setTopPos");
        spyOn(instance, "setLeftPos");
        spyOn(instance, "setBottomPos");
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        comp.componentInstance.resizeStart.emit(instance);
        layoutContainer.dispatchEvent(new MouseEvent("mouseup"));
        expect(instance.setTopPos).toHaveBeenCalled();
        expect(instance.setLeftPos).toHaveBeenCalled();
        expect(instance.setBottomPos).toHaveBeenCalled();
    });
    
    it('stoping resizing a container should remove the event listeners', () => {
        const layoutContainer: HTMLDivElement = document.createElement("div");
        const containers: any = [];
        const comp = TestBed.createComponent(BorderLayoutContainer);
        const instance = comp.componentInstance;
        spyOn(layoutContainer, "removeEventListener");
        instance.constraints = { region: LayoutRegion.EAST, resizable: true };
        containers.push(instance);
        renderer.setLayoutContainer(layoutContainer);
        renderer.addContainers(containers);
        comp.componentInstance.resizeStart.emit(instance);
        layoutContainer.dispatchEvent(new MouseEvent("mouseup"));
        expect(layoutContainer.removeEventListener).toHaveBeenCalledTimes(2);
    });
});

describe('BorderLayoutRenderer: destroy() method', () => {

    let renderer: BorderLayoutRenderer;
    let service: SubscriptionService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BorderLayoutContainer],
            providers: [SubscriptionService]
        })
        .compileComponents();
        service = TestBed.inject(SubscriptionService);
        renderer = new BorderLayoutRenderer(service);
    });
    
    it('destroy() should delete the BorderLayoutBoundsManager instance', () => {
        renderer.destroy();
        expect(renderer.getBoundsManager()).toBeNull();
    });

    it('destroy() should remove all registered events', () => {
        spyOn(service, "clearAll")
        renderer.destroy();
        expect(service.clearAll).toHaveBeenCalledOnceWith(renderer);
    });
});