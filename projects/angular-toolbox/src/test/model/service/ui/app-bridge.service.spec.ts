/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { TestBed } from '@angular/core/testing';
import { AppBrigeService } from '../../../../lib/model/service/ui/app-bridge.service';
import { DOCUMENT } from '@angular/common';
import { NavigationExtras, Router, RouterModule } from '@angular/router';

describe('AppBrigeService', () => {

    const segment: string[] = ["/segment"];
    const extras: NavigationExtras = {};

    let service: AppBrigeService;
    let document: any;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule
            ],
            providers: [Router]
        });
        service = TestBed.inject(AppBrigeService);
        document = TestBed.inject(DOCUMENT);
        router = TestBed.inject(Router);
    });

    it('should create an instance', () => {
        expect(service).toBeTruthy();
    });

    it('should create an appBridge object on the defaultView default view', () => {
        expect(document.defaultView.appBridge).toBeTruthy();
    });

    /*it('navigate should invoke the angular router, in the app context, with the specified parameters', () => {
        spyOn(router, 'navigate');
        document.defaultView.appBridge.navigate(segment, extras);
        expect(router.navigate).toHaveBeenCalledWith(segment, extras);
    });*/
    
    it('should open a new window with the specified url', () => {
        const url: string = "https://pascalechemann.com/angular-toolbox";
        spyOn(window, 'open')
        document.defaultView.appBridge.open(url);
        expect(window.open).toHaveBeenCalledWith(url, '_blank');
    });

});
