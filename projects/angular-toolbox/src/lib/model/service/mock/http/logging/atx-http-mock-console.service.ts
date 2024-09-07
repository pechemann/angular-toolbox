/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable, OnDestroy } from "@angular/core";
import { AtxMonitoringConsoleComponent } from "../../../../../framework/mock/http-monitoring-console";
import { Uuid } from "../../../../../util";
import { WindowService } from "../../../ui";
import { WindowFeatureState, WindowInit, WindowRef } from "../../../../business";

/**
 * @private
 */
const NO: WindowFeatureState = WindowFeatureState.NO;

/**
 * @private
 */
export const FEATURES: WindowInit = {
  left: 100,
  top: 100,
  width: 800,
  height: 450,
  directories: NO,
  titlebar: NO,
  scrollbars: NO,
  toolbar: NO,
  location: NO,
  status: NO,
  menubar: NO,
  title: "HTTP Mocking Framework Console",
  icon: "data:image/png;base64,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"
};

/**
 * Provides functionality to display the ATX monitoring console within a new window.
 */
@Injectable({
  providedIn: 'root'
})
export class AtxHttpMockConsoleService implements OnDestroy {

  /**
   * @private
   */
  private _uuid: Uuid | null = null;

  /**
   * @private
   */
  constructor(private _windowSrv: WindowService) {}

  /**
   * Opens the ATX monitoring console within a new window and returns reference objects
   * to control it.
   */
  public open(): void {
    if (this._uuid) return;
    this._uuid = this._windowSrv.open(AtxMonitoringConsoleComponent, FEATURES);
  }

  /**
   * Closes the ATX monitoring console currently opened within a popup window.
   */
  public close(): void {
    if (!this._uuid) return;
    this._windowSrv.close(this._uuid);
    this._uuid = null;
  }

  /**
   * Returns reference to the opened popup window.
   * 
   * @returns A `WindowRef` object, or undefined if the ATX monitoring console is not opened.
   */
  public getWindowRef(): WindowRef<AtxMonitoringConsoleComponent, Window> | undefined {
    if (!this._uuid) return undefined;
    return this._windowSrv.get(this._uuid);
  }

  /**
   * @private
   */
  public ngOnDestroy(): void {
    this.close();
  }
}