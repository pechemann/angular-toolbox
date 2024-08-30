/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ApplicationRef, ComponentRef, Injectable, OnDestroy } from "@angular/core";
import { AtxMonitoringConsoleComponent } from "../../../../../framework/mock/http-monitoring-console";
import { EMPTY_STRING } from "../../../../../util";
import { AtxHttpMockConsolePopup } from "../../../../business/mock/http/popup/atx-http-mock-console-popup";

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
  private _window: WindowProxy | null = null;

  /**
   * @private
   */
  private _componentRef: ComponentRef<AtxMonitoringConsoleComponent> | null = null;

  /**
   * @private
   */
  constructor(private _appRef: ApplicationRef) { }

  /**
   * Opens the ATX monitoring console within a new window and returns reference objects
   * to control it.
   * 
   * @returns An `AtxHttpMockConsolePopup` object.
   */
  public open(): AtxHttpMockConsolePopup | null {
    if (this._window) null;
    const features: string = "left=100,top=100,width=800,height=450,popup=true,directories=no,titlebar=no,scrollbars=no,toolbar=no,location=no,status=no,menubar=no";
    const popup: WindowProxy | null = window.open(EMPTY_STRING, '_blank', features);
    this._window = popup;
    if (!popup) return null;
    popup.document.title = "HTTP Mocking Framework Console";
    const componentRef: ComponentRef<AtxMonitoringConsoleComponent> = this._appRef.bootstrap(AtxMonitoringConsoleComponent, popup.document.body);
    this._componentRef = componentRef;
    return {
      popup: popup,
      componentRef: componentRef
    };
  }

  /**
   * Closes the ATX monitoring console currently opened within a popup window.
   */
  public close(): void {
    if (!this._window) return;
    this._window.close();
    this._window = null;
    this._componentRef?.destroy();
    this._componentRef = null;
  }

  /**
   * @private
   */
  public ngOnDestroy(): void {
    this.close();
  }
}