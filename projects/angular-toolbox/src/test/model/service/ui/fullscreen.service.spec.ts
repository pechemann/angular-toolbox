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
    const OPT: FullscreenOptions = { navigationUI: 'auto' };

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
    
    it('change should be invoked when toggleFullscreenMode() is called', async() => {
        const btn = testDocument.createElement("button");
        spyOn(service.change, "emit");
        btn.onclick = ()=> {
            service.toggleFullscreenMode().then(()=> {
                expect(service.change.emit).toHaveBeenCalledWith(true);
            });
        };
        btn.dispatchEvent(new MouseEvent("click"));
    });
    
    it('options should be passed to document fullscreen API when target parameter is null', (done) => {
        const btn = testDocument.createElement("button");
        spyOn(testDocument.documentElement, "requestFullscreen");
        btn.onclick = ()=> {
            service.toggleFullscreenMode(null, OPT);
            expect(testDocument.documentElement.requestFullscreen).toHaveBeenCalledWith(OPT);
            done();
        };
        btn.dispatchEvent(new MouseEvent("click"));
    }); 

    it('options should be passed to the fullscreen API of the specified Element when target parameter is not null', (done) => {
        const btn = testDocument.createElement("button"),
              div = testDocument.createElement("div");
        spyOn(div, "requestFullscreen");
        btn.onclick = ()=> {
            service.toggleFullscreenMode(div, OPT);
            expect(div.requestFullscreen).toHaveBeenCalledWith(OPT);
            done();
        };
        btn.dispatchEvent(new MouseEvent("click"));
    });
});
