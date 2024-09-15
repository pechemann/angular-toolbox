/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BorderLayoutRenderer } from "projects/angular-toolbox/src/lib/component/layout/border-layout/util/border-layout-renderer";
import { BorderLayoutContainer, SubscriptionService } from "projects/angular-toolbox/src/public-api";

describe('BorderLayout', () => {

    let renderer: BorderLayoutRenderer;
    let service: SubscriptionService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BorderLayoutContainer],
            providers: [SubscriptionService]
        })
        .compileComponents();
        service = TestBed.inject(SubscriptionService);
        renderer = new BorderLayoutRenderer(service);
    });

    it('should create a new instance', () => {
        expect(renderer).toBeTruthy();
    });
});