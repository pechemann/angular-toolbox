/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { AtxHttpMockConsoleService, AtxMonitoringConsoleComponent, FEATURES, WindowService } from 'projects/angular-toolbox/src/public-api';

describe('HttpMockLoggingService', () => {

    let service: AtxHttpMockConsoleService;
    let winService: WindowService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [WindowService] });
        service = TestBed.inject(AtxHttpMockConsoleService);
        winService = TestBed.inject(WindowService);
    });

    afterEach(() => {
        service.ngOnDestroy();
        winService.ngOnDestroy();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getWindowRef() should return undefined by default', () => {
        expect(service.getWindowRef()).toBeUndefined();
    });

    it('getWindowRef() should return a WindowRef object when the open() method is invoked', () => {
        service.open();
        const ref = service.getWindowRef();
        expect(ref?.componentRef).toBeTruthy();
        expect(ref?.window).toBeTruthy();
    });

    it('open() should create an AtxMonitoringConsoleComponent instance', () => {
        let ref: any = service.open();
        const compRef = service.getWindowRef()?.componentRef as any;
        expect(compRef.instance).toBeInstanceOf(AtxMonitoringConsoleComponent);
        ref = compRef;
    });

    it('open() should set the correct title to the AtxMonitoringConsoleComponent instance', () => {
        service.open();
        const window = service.getWindowRef()?.window as any;
        expect(window.document.querySelector('title').textContent).toEqual(FEATURES.title);
        service.close();
    });

    it('open() add a favicon to the AtxMonitoringConsoleComponent instance', () => {
        service.open();
        const window = service.getWindowRef()?.window as any;
        const link = window.document.querySelector('link');
        expect(link.getAttribute("rel")).toEqual("shortcut icon");
        expect(link.getAttribute("href")).toEqual(FEATURES.icon);
        service.close();
    });

    it('close() should close and remove reference to the opened window', () => {
        service.open();
        const ref = service.getWindowRef() as any;
        const window = ref.window;
        const close = window.close;
        spyOn(window, "close");
        service.close();
        expect(window.close).toHaveBeenCalled();
        expect(service.getWindowRef()).toBeUndefined();
        close();
    });
    
    
});