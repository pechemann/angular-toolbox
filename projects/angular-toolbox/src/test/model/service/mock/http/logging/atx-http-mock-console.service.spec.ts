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
});