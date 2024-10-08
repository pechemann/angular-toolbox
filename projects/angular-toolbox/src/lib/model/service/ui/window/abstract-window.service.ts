/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EventEmitter, Type } from "@angular/core";
import { Uuid } from "../../../../util";
import { Destroyable, WindowRef } from "../../../business";

/**
 * The abstract class that must be implemented by services that provide
 * functionality to display Angular component within a new browser window.
 */
export abstract class AbstractWindowService implements Destroyable {

  /**
   * An event triggered each time a window is closed.
   */
  public readonly windowClose: EventEmitter<Uuid> = new EventEmitter();

  /**
   * @private
   */
  protected windowRefMap: Map<Uuid, WindowRef<any, any>> = new Map();

  /**
   * Returns the window reference object associated with the specified `Uuid` object.
   * 
   * @param uuid The `Uuid` object associated with the window reference to get.
   * 
   * @returns A `WindowRef` object, or `undefined` if the reference cannot be found.
   */
  public get(uuid: Uuid): WindowRef<any, any> | undefined {
    return this.windowRefMap.get(uuid);
  }

  /**
   * Returns all the window reference objects created by the service.
   * 
   * @returns A list of `WindowRef` objects created by this service.
   */
  public getAll(): WindowRef<any, any>[] {
    return Array.from(this.windowRefMap.values());
  }

  /**
   * @private
   */
  public destroy(): void {
    this.windowRefMap.clear();
  }

  /**
   * Opens a new browser window with the specified properties and attaches an instance of 
   * the specified component into the window container.
   * 
   * @param component The component to attach in the new window.
   * @param init The config used to initialize the window.
   * 
   * @returns A `Uuid` object.
   */
  abstract open<T>(component: Type<T>, init?: any): Uuid;

  /**
   * Closes the window associated with the specified `Uuid` object.
   * 
   * @param uuid The `Uuid` object associated with the window to close.
   * 
   * @returns `true` whether the window exists and is closed; `false` otherwise.
   */
  abstract close(uuid: Uuid): boolean;

  /**
   * Closes all opened windows.
   */
  abstract closeAll(): void;
}