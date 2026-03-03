/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Defines the API of objects passed as parameters to the `ButtonRoleDirective.enter`
 * event emitter.
 */
export interface ButtonRoleDataObject<T> {

    /**
     * Possible data associated the `enter` event of the `ButtonRoleDirective` functionality.
     * Default value is (`null`).
     */
    data: T | null;
    
    /**
     * The reference to the original user input event that triggered the directive `enter` event.
     */
    event: MouseEvent | KeyboardEvent | PointerEvent;
}
