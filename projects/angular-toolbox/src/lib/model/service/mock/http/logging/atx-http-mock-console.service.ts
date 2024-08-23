/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ApplicationRef, Injectable, OnDestroy } from "@angular/core";
import { AtxMonitoringConsoleComponent } from "../../../../../framework/mock/http-monitoring-console";

@Injectable({
  providedIn: 'root'
})
export class AtxHttpMockConsoleService implements OnDestroy {

  private _window: WindowProxy | null = null;

  constructor(private _appRef: ApplicationRef) { }

  public open(): Window | null {
    const features: string = "left=100,top=100,width=800,height=450,popup=true,directories=no,titlebar=no,scrollbars=no,toolbar=no,location=no,status=no,menubar=no";
    const popup: WindowProxy | null = window.open('', '_blank', features);
    this._window = popup;
    if (!popup) return null;
    popup.document.title = "HTTP Mocking Framework Console";
    /*const componentRef = */this._appRef.bootstrap(AtxMonitoringConsoleComponent, popup.document.body);
    return popup;
  }

  public close(): void {
    if (!this._window) return;
    //this._appRef.detachView()
    this._window.close();
    this._window = null;
  }

  public ngOnDestroy(): void {
    this.close();
  }
}