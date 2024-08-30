/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentRef } from "@angular/core";
import { AtxMonitoringConsoleComponent } from "../../../../../framework";

/**
 * The `AtxHttpMockConsolePopup` interface provides component references for
 * the ATX monitoring console objects created with the `AtxHttpMockConsoleService` class.
 */
export interface AtxHttpMockConsolePopup {

    /**
     * The reference to a popup window created with the `AtxHttpMockConsoleService` class.
     */
    popup: Window;

    /**
     * The reference to a `AtxMonitoringConsoleComponent` instance created with the `AtxHttpMockConsoleService` class.
     */
    componentRef: ComponentRef<AtxMonitoringConsoleComponent>;
}