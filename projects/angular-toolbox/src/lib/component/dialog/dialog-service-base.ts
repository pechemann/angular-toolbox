/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentRef, EventEmitter, ViewContainerRef } from "@angular/core";
import { DialogOutletEvent } from "./dialog-outlet.event";
import { DialogConfig } from "./dialog.config";

export class DialogServiceBase {

    public readonly dialogStateChange: EventEmitter<DialogOutletEvent> = new EventEmitter();

    protected viewContainerRef!: ViewContainerRef;

    public show<T>(compRef: any, config: DialogConfig | null = null): ComponentRef<T> | null {
        const component: ComponentRef<T> = this.viewContainerRef.createComponent<T>(compRef);
        const event: DialogOutletEvent = new DialogOutletEvent(DialogOutletEvent.SHOW, config);
        this.dialogStateChange.emit(event);
        return component;
    }

    public hide(): void {
        const event: DialogOutletEvent = new DialogOutletEvent(DialogOutletEvent.HIDE);
        this.dialogStateChange.emit(event);
    }

    /**
     * @private
     */
    public __init__(viewContainerRef: ViewContainerRef): void {
        if (this.viewContainerRef !== undefined) return;
        this.viewContainerRef = viewContainerRef;
    }
}