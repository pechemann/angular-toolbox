/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { FullscreenService } from 'projects/angular-toolbox/src/public-api';

describe('FullscreenService', () => {
    
    let service: FullscreenService;
    let testDocument: any;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: DOCUMENT, useValue: document }
            ]
        }).compileComponents();
        testDocument = TestBed.inject(DOCUMENT);
        service = TestBed.inject(FullscreenService);
    });

    it('should create an instance', () => {
        expect(service).toBeTruthy();
    });

    it('isFullscreenModeActive should be readable only', () => {
        const action: Function = ()=> (service as any).isFullscreenModeActive = true;
        expect(action).toThrowError();
    });

    it('isFullscreenModeActive should be false by default', () => {
        expect(service.isFullscreenModeActive).toBeFalse();
    });

    it('isFullscreenModeActive should be true when toggleFullscreenMode() is called once', async() => {
        const btn = testDocument.createElement("button");
        btn.onclick = ()=> {
            expect(service.isFullscreenModeActive).toBeFalse();
            service.toggleFullscreenMode().then(()=> {
                expect(service.isFullscreenModeActive).toBeTrue();
            });
        };
        btn.dispatchEvent(new MouseEvent("click"));
    });
    
    it('isFullscreenModeActive should be false when toggleFullscreenMode() is called twice', async() => {
        const btn = testDocument.createElement("button");
        btn.onclick = ()=> {
            expect(service.isFullscreenModeActive).toBeFalse();
            service.toggleFullscreenMode().then(()=> {
                btn.onclick = ()=> {
                    service.toggleFullscreenMode().then(()=> {
                        expect(service.isFullscreenModeActive).toBeFalse();
                    });
                };
                btn.dispatchEvent(new MouseEvent("click"));
            });
        };
        btn.dispatchEvent(new MouseEvent("click"));
    });
});
