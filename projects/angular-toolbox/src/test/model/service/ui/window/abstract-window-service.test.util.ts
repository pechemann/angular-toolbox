/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Type } from "@angular/core";
import { AbstractWindowService, Uuid, WindowRef } from "projects/angular-toolbox/src/public-api";

@Component({
    selector: "window-test-component",
    template:'<div></div>',
    standalone: true
})
export class WindowTestComponent {}

export class AbstractWindowServiceImpl extends AbstractWindowService {

    constructor() { super(); }

    override open(component: Type<any>): Uuid {
        const uuid: Uuid = Uuid.build();
        const componentRef = { instance: new component() };
        const ref: WindowRef<any, any> = {
            componentRef: componentRef as any,
            window: null as any,
        };
        this.windowRefMap.set(uuid, ref);
        return uuid;
    }

    override close(): boolean {
        return true;
    }
    
    override closeAll(): void {}
}