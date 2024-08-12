/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * The `Destroyable` interface provides a global interface for creating object that might be destroyed by the system.
 */
export interface Destroyable {

    /**
     * Makes an object elligible for garbage collection.
     */
    destroy(): void | any;
}