/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BorderLayoutContainer, LayoutConstraints, LayoutRegion } from "projects/angular-toolbox/src/public-api";

describe('BorderLayoutContainer', () => {

    let component: BorderLayoutContainer;
    let fixture: ComponentFixture<BorderLayoutContainer>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BorderLayoutContainer]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(BorderLayoutContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create a new component instance', () => {
        expect(component).toBeTruthy();
    });

    it('constraints should be undefined by default', () => {
        expect(component.constraints).toBeUndefined();
    });

    it('class should be undefined by default', () => {
        expect(component.class).toBeUndefined();
    });

    it('constraints should be equal to the specified constraints object', () => {
        const ctx: LayoutConstraints = {
            region: LayoutRegion.EAST
        };
        component.constraints = ctx;
        expect(component.constraints).toEqual(ctx);
    });

    it('constraints should update the class property with the region value', () => {
        const ctx: LayoutConstraints = {
            region: LayoutRegion.EAST
        };
        component.constraints = ctx;
        expect(component.class).toEqual(ctx.region);
    });

    it('dragging handle should not be available by default', () => {
        expect(fixture.nativeElement.querySelector('.atx-handle')).toBeNull();
    });

    it('constraints.resizable should display the dragging handle', () => {
        component.constraints = {
            region: LayoutRegion.EAST,
            resizable: true
        };
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.atx-handle')).toBeTruthy();
    });

    it('dragging handle should not be available when region is LayoutRegion.CENTER', () => {
        component.constraints = {
            region: LayoutRegion.CENTER,
            resizable: true
        };
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.atx-handle')).toBeNull();
    });

    it('constraints should invoke the setSize() method', () => {
        spyOn(component, "setSize");
        const ctx: LayoutConstraints = {
            region: LayoutRegion.EAST,
            size: 10
        };
        component.constraints = ctx;
        expect(component.setSize).toHaveBeenCalledWith(ctx.size);
    });
    
    it('getSize() should return undefined by default', () => {
        expect(component.getSize()).toBeUndefined();
    });

    it('getSize() should return the value specified by the setSize() method', () => {
        component.constraints = {
            region: LayoutRegion.EAST,
            size: 50
        };
        expect(component.getSize()).toEqual(50);
        component.setSize(10);
        expect(component.getSize()).toEqual(10);
    });

    it('getSize() should return undefined when region is LayoutRegion.CENTER', () => {
        component.constraints = {
            region: LayoutRegion.CENTER,
            size: 50
        };
        expect(component.getSize()).toBeUndefined();
        component.setSize(10);
        expect(component.getSize()).toBeUndefined();
    });

    it('default size should be 50 when region is LayoutRegion.NORTH', () => {
        component.constraints = {
            region: LayoutRegion.NORTH,
        };
        expect(component.getSize()).toEqual(50);
    });

    it('default size should be 50 when region is LayoutRegion.SOUTH', () => {
        component.constraints = {
            region: LayoutRegion.SOUTH,
        };
        expect(component.getSize()).toEqual(50);
    });

    it('default size should be 100 when region is LayoutRegion.EAST', () => {
        component.constraints = {
            region: LayoutRegion.EAST,
        };
        expect(component.getSize()).toEqual(100);
    });

    it('default size should be 100 when region is LayoutRegion.WEST', () => {
        component.constraints = {
            region: LayoutRegion.WEST,
        };
        expect(component.getSize()).toEqual(100);
    });
    
    it('style height should be updated when region is LayoutRegion.NORTH', () => {
        component.constraints = {
            region: LayoutRegion.NORTH,
            size: 200
        };
        expect(fixture.nativeElement.style.height).toEqual("200px");
    });
    
    it('style height should be updated when region is LayoutRegion.SOUTH', () => {
        component.constraints = {
            region: LayoutRegion.SOUTH,
            size: 200
        };
        expect(fixture.nativeElement.style.height).toEqual("200px");
    });
    
    it('style width should be updated when region is LayoutRegion.EAST', () => {
        component.constraints = {
            region: LayoutRegion.EAST,
            size: 200
        };
        expect(fixture.nativeElement.style.width).toEqual("200px");
    });
    
    it('style width should be updated when region is LayoutRegion.WEST', () => {
        component.constraints = {
            region: LayoutRegion.WEST,
            size: 200
        };
        expect(fixture.nativeElement.style.width).toEqual("200px");
    });

    it('setLeftPos() should update the style left property', () => {
        component.setLeftPos(33);
        expect(fixture.nativeElement.style.left).toEqual("33px");
    });

    it('setRightPos() should update the style right property', () => {
        component.setRightPos(33);
        expect(fixture.nativeElement.style.right).toEqual("33px");
    });

    it('setTopPos() should update the style top property', () => {
        component.setTopPos(33);
        expect(fixture.nativeElement.style.top).toEqual("33px");
    });

    it('setBottomPos() should update the style bottom property', () => {
        component.setBottomPos(33);
        expect(fixture.nativeElement.style.bottom).toEqual("33px");
    });

    it('pressing on the dragging handle should trigger a resizeStart event', () => {
        spyOn(component.resizeStart, "emit");
        component.constraints = {
            region: LayoutRegion.EAST,
            resizable: true
        };
        fixture.detectChanges();
        const handle = fixture.nativeElement.querySelector('.atx-handle');
        handle.dispatchEvent(new MouseEvent("mousedown"));
        expect(component.resizeStart.emit).toHaveBeenCalledWith(component);
    });
});