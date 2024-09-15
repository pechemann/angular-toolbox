/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BorderLayoutRenderer } from "projects/angular-toolbox/src/lib/component/layout/border-layout/util/border-layout-renderer";
import { BorderLayout } from "projects/angular-toolbox/src/public-api";

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