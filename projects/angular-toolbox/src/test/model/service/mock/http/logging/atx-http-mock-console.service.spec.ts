/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AtxHttpMockConsoleService, AtxMonitoringConsoleComponent } from 'projects/angular-toolbox/src/public-api';

describe('HttpMockLoggingService', () => {

    let service: AtxHttpMockConsoleService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [AtxHttpMockConsoleService, ApplicationRef] });
        service = TestBed.inject(AtxHttpMockConsoleService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('open() should return an AtxHttpMockConsolePopup object', () => {
        let ref: any = service.open();
        expect(ref.hasOwnProperty("popup")).toBeTrue();
        expect(ref.componentRef.instance).toBeInstanceOf(AtxMonitoringConsoleComponent);
        ref = null;
    });

    it('open() should set the correct title to the AtxHttpMockConsolePopup object', () => {
        let ref: any = service.open();
        expect(ref.popup.document.querySelector('title').textContent).toEqual("HTTP Mocking Framework Console");
        service.close();
        ref = null;
    });

    it('open() add a favicon to the AtxHttpMockConsolePopup object', () => {
        let ref: any = service.open();
        const link = ref.popup.document.querySelector('link');
        expect(link.getAttribute("rel")).toEqual("shortcut icon");
        expect(link.getAttribute("href")).toEqual(service.ICON);
        service.close();
        ref = null;
    });

    it('close() should close and destroy the AtxHttpMockConsolePopup object', () => {
        let ref: any = service.open();
        const close = ref.popup.close;
        spyOn(ref.popup, "close");
        service.close();
        expect(ref.popup.close).toHaveBeenCalled();
        close();
        ref = null;
    });
    
    it('ngOnDestroy() should invoke the close() method', () => {
        let ref: any = service.open();
        const close = ref.popup.close;
        spyOn(ref.popup, "close");
        service.ngOnDestroy();
        expect(ref.popup.close).toHaveBeenCalled();
        close();
        ref = null;
    });
    
    it('beforeunload event test: unloading the parent window should invoke the ngOnDestroy() method', () => {
        let ref: any = service.open();
        spyOn(service, "ngOnDestroy");
        window.dispatchEvent(new Event('beforeunload'));
        expect(service.ngOnDestroy).toHaveBeenCalled();
        service.close();
        ref = null;
    });
});