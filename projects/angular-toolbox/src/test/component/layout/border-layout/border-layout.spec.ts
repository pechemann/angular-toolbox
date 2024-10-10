/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BorderLayoutRenderer } from "projects/angular-toolbox/src/lib/component/layout/border-layout/util/border-layout-renderer";
import { BorderLayout, LayoutDragEvent, LayoutDragEventType, LayoutRegion } from "projects/angular-toolbox/src/public-api";

describe('BorderLayout', () => {

    let component: BorderLayout;
    let fixture: ComponentFixture<BorderLayout>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BorderLayout]
        })
        .compileComponents();
        fixture = TestBed.createComponent(BorderLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create a new component instance', () => {
        expect(component).toBeTruthy();
    });

    it('getRenderer() should return a BorderLayoutRenderer instance', () => {
        expect(component.getRenderer()).toBeInstanceOf(BorderLayoutRenderer);
    });

    it('paint() should invoke the BorderLayoutRenderer.paint() method', () => {
        const renderer: BorderLayoutRenderer = component.getRenderer();
        spyOn(renderer, "paint");
        component.paint();
        expect(renderer.paint).toHaveBeenCalled();
    });

    it('ngAfterViewInit() should invoke the BorderLayoutRenderer.paint() method', () => {
        const renderer: BorderLayoutRenderer = component.getRenderer();
        spyOn(renderer, "paint");
        component.ngAfterViewInit();
        expect(renderer.paint).toHaveBeenCalled();
    });

    it('ngAfterViewInit() should invoke the BorderLayoutRenderer.setLayoutContainer() method', () => {
        const renderer: BorderLayoutRenderer = component.getRenderer();
        spyOn(renderer, "setLayoutContainer");
        component.ngAfterViewInit();
        expect(renderer.setLayoutContainer).toHaveBeenCalled();
    });

    it('ngOnDestroy() should invoke the BorderLayoutRenderer.destroy() method', () => {
        const renderer: BorderLayoutRenderer = component.getRenderer();
        spyOn(renderer, "destroy");
        component.ngOnDestroy();
        expect(renderer.destroy).toHaveBeenCalled();
    });
    
    it('start resizing a container should emit a LayoutDragEvent of type DRAG_START', (done) => {
        const container: any = {};
        const renderer: BorderLayoutRenderer = component.getRenderer();
        const sub = component.dragStart.subscribe(event=> {
            expect(event.type).toEqual(LayoutDragEventType.DRAG_START);
            expect(event.target).toBe(container);
            expect(event.layout).toBe(component);
            sub.unsubscribe();
            done();
        });
        renderer.userAction.emit(new LayoutDragEvent(container, LayoutDragEventType.DRAG_START));
    });
    
    it('resizing a container should emit a LayoutDragEvent of type DRAGGING', (done) => {
        const container: any = {};
        const renderer: BorderLayoutRenderer = component.getRenderer();
        const sub = component.dragging.subscribe(event=> {
            expect(event.type).toEqual(LayoutDragEventType.DRAGGING);
            expect(event.target).toBe(container);
            expect(event.layout).toBe(component);
            sub.unsubscribe();
            done();
        });
        renderer.userAction.emit(new LayoutDragEvent(container, LayoutDragEventType.DRAGGING));
    });
    
    it('stopping resizing a container should emit a LayoutDragEvent of type DRAG_STOP', (done) => {
        const container: any = {};
        const renderer: BorderLayoutRenderer = component.getRenderer();
        const sub = component.dragStop.subscribe(event=> {
            expect(event.type).toEqual(LayoutDragEventType.DRAG_STOP);
            expect(event.target).toBe(container);
            expect(event.layout).toBe(component);
            sub.unsubscribe();
            done();
        });
        renderer.userAction.emit(new LayoutDragEvent(container, LayoutDragEventType.DRAG_STOP));
    });

    it('resizeRegion() should invoke the BorderLayoutRenderer.resizeRegion() method', () => {
        const renderer: BorderLayoutRenderer = component.getRenderer();
        spyOn(renderer, "resizeRegion");
        component.resizeRegion(LayoutRegion.EAST, 300);
        expect(renderer.resizeRegion).toHaveBeenCalledWith(LayoutRegion.EAST, 300);
    });
});

describe('BorderLayout: BorderLayoutContainer test', () => {

    it('should create invoke the BorderLayoutRenderer.addContainers() method', async() => {
        await TestBed.configureTestingModule({
            imports: [BorderLayout]
        })
        .compileComponents();
        const fixture = TestBed.createComponent(BorderLayout);
        const component = fixture.componentInstance;
        const renderer: BorderLayoutRenderer = component.getRenderer();
        spyOn(renderer, "addContainers");
        fixture.detectChanges();
        expect(renderer.addContainers).toHaveBeenCalled();
    });
});