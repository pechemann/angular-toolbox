/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Defines the type of a `DropdownEvent` instance.
 */
export enum DropdownEventType {

    /**
     * Defines an event fired on a dropdown component just after it is shown or hidden.
     */
    TOGGLE = "toggle",

    /**
     * Defines an event fired on a dropdown component just before it is shown or hidden.
     */
    BEFORE_TOGGLE = "beforetoggle",
}