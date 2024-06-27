/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

/**
 * The `Destroyable` interface provides a global interface for creating object that might be destroyed by the system.
 */
export type AppBridgeCommand = (...rest: any[])=> void;