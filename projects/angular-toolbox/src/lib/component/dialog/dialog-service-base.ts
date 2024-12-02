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

/**
 * The base class for creating services that manage injection of custom component into the
 * HTML dialog element created by the ATX framework.
 */
export class DialogServiceBase {

    /**
     * Dispatches an event that indicates the state of the dialog element when a custom
     * component is added to, or remove from, it.
     */
    public readonly dialogStateChange: EventEmitter<DialogOutletEvent> = new EventEmitter();

    /**
     * @private
     */
    protected viewContainerRef!: ViewContainerRef;

    /**
     * Creates an instance of the `compRef` class, adds this instance to the HTML dialog element
     * and displays the dialog element in front of all other components in the application.
     * 
     * @param compRef The class that represents the component to display as a popup element.
     * @param config The dialog element config associated with the new component instance to display.
     * 
     * @returns The new `ComponentRef` which contains the component instance and the host view.
     */
    public show<T>(compRef: any, config: DialogConfig | null = null): ComponentRef<T> {
        const component: ComponentRef<T> = this.viewContainerRef.createComponent<T>(compRef);
        const event: DialogOutletEvent = new DialogOutletEvent(DialogOutletEvent.SHOW, config);
        this.dialogStateChange.emit(event);
        return component;
    }

    /**
     * Indicates to the ATX framework to remove component instances previously created with
     * the `show()` method.
     */
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