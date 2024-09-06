/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentRef } from "@angular/core";
import { Uuid } from "../../../../util";

/**
 * Defines the type of objects managed by the `AbstractWindowService` class.
 */
export interface WindowRef<T, U> {
    
    /**
     * The reference to a window stored within the `AbstractWindowService` class.
     */
    window: U;

    /**
     * The reference to the Angular component displayed within a window.
     */
    componentRef: ComponentRef<T>;

    /**
     * The unique identifier associated with a window.
     */
    uuid: Uuid;
}