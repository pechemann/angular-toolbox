/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Uuid, WindowService } from 'projects/angular-toolbox/src/public-api';
import { WindowTestComponent } from './abstract-window-service.test.util';
import { BrowserWindowFeaturesBuilder } from 'projects/angular-toolbox/src/lib/util/window/window-features-builder';
import { WindowHeaderTagUtil } from 'projects/angular-toolbox/src/lib/util/window/window-header-tag-util';

describe('WindowService', () => {

    let service: WindowService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [WindowService, ApplicationRef] });
        service = TestBed.inject(WindowService);
    });

    afterEach(() => {
        if (service) service.ngOnDestroy();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('open() should return a Uuid object', () => {
        let ref: any = service.open(WindowTestComponent);
        expect(ref).toBeInstanceOf(Uuid);
        ref = null;
    });

    it('open() should add the window the reference to the service', () => {
        let ref: any = service.open(WindowTestComponent);
        expect(service.get(ref)).toBeTruthy();
        ref = null;
    });

    it('open() should invoke the BrowserWindowFeaturesBuilder.build() method', () => {
        const init = { title: "Test window" };
        spyOn(BrowserWindowFeaturesBuilder, "build");
        service.open(WindowTestComponent, init);
        expect(BrowserWindowFeaturesBuilder.build).toHaveBeenCalledOnceWith(init);
    });

    it('open() should invoke the WindowHeaderTagUtil.setTitle() method', () => {
        const init = { title: "Test window" };
        spyOn(WindowHeaderTagUtil, "setTitle");
        service.open(WindowTestComponent, init);
        expect(WindowHeaderTagUtil.setTitle).toHaveBeenCalled();
    });

    it('open() should invoke the WindowHeaderTagUtil.setIcon() method', () => {
        const init = { title: "Test window" };
        spyOn(WindowHeaderTagUtil, "setIcon");
        service.open(WindowTestComponent, init);
        expect(WindowHeaderTagUtil.setIcon).toHaveBeenCalled();
    });

    it('close() should remove references to the opened window', () => {
        let ref: any = service.open(WindowTestComponent);
        service.close(ref);
        expect(service.get(ref)).toBeUndefined();
        ref = null;
    });

    it('close() should invoke the close() method of the opened window', () => {
        let ref: any = service.open(WindowTestComponent);
        const window = (service.get(ref) as any).window;
        const close = window.close;
        spyOn(window, "close");
        service.close(ref);
        expect(window.close).toHaveBeenCalled();
        close();
        ref = null;
    });
    
    it('close() should invoke the destroy() method of the component reference', () => {
        let ref: any = service.open(WindowTestComponent);
        const comp = (service.get(ref) as any).componentRef;
        spyOn(comp, "destroy");
        service.close(ref);
        expect(comp.destroy).toHaveBeenCalled();
        ref = null;
    });
    
    it('close() should emit an event with the associated Uuid', (done) => {
        let ref: any = service.open(WindowTestComponent);
        service.windowClose.subscribe(next => {
            expect(next).toEqual(ref);
            done();
            ref = null;
        });
        service.close(ref);
    });

    it('closeAll() should remove references to the opened windows', () => {
        let ref: any = service.open(WindowTestComponent);
        service.closeAll();
        expect(service.get(ref)).toBeUndefined();
        expect(service.getAll().length).toEqual(0);
        ref = null;
    });

    it('ngOnDestroy() should invoke the closeAll() method', () => {
        let ref: any = service.open(WindowTestComponent);
        const window = (service.get(ref) as any).window;
        spyOn(service, "closeAll");
        service.ngOnDestroy();
        expect(service.closeAll).toHaveBeenCalled();
        ref = null;
        service = null as any;
        window.close();
    });

    it('ngOnDestroy() should invoke the destroy() method', () => {
        let ref: any = service.open(WindowTestComponent);
        const window = (service.get(ref) as any).window;
        spyOn(service, "destroy");
        service.ngOnDestroy();
        expect(service.destroy).toHaveBeenCalled();
        ref = null;
        service = null as any;
        window.close();
    });
    
    it('beforeunload event test: unloading the parent window should invoke the ngOnDestroy() method', () => {
        let ref: any = service.open(WindowTestComponent);
        spyOn(service, "ngOnDestroy");
        window.dispatchEvent(new Event('beforeunload'));
        expect(service.ngOnDestroy).toHaveBeenCalled();
        service.close(ref);
        ref = null;
    });
});