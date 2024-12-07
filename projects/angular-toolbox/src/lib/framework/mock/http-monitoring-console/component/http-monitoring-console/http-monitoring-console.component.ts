/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { AtxRequestDetailsComponent } from '../request-details/request-details.component';
import { AtxConsoleFooterComponent } from '../console-footer/console-footer.component';
import { AtxConsoleMenuComponent } from '../console-menu/console-menu.component';
import { AtxRequestListRendererComponent } from '../renderer/request-list-renderer/request-list-renderer.component';
import { AtxMonitoringConsoleState } from '../../model/service/atx-monitoring-console.state';
import { AtxLogIoService } from '../../model/service/atx-log-io.service';
import { AtxMonitoringConsoleController } from '../../model/service/atx-monitoring-console.controller';
import { AtxUserActionService } from '../../model/service/atx-user-action.service';

/**
 * @private
 * The main component used to layout the ATX monitoring console.
 */
@Component({
    selector: 'atx-http-monitoring-console',
    imports: [
        AtxRequestDetailsComponent,
        AtxConsoleFooterComponent,
        AtxConsoleMenuComponent,
        AtxRequestListRendererComponent
    ],
    templateUrl: './http-monitoring-console.component.html',
    styleUrl: './http-monitoring-console.component.scss',
    providers: [
        AtxMonitoringConsoleState,
        AtxLogIoService,
        AtxMonitoringConsoleController,
        AtxUserActionService
    ],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AtxMonitoringConsoleComponent {

  /**
   * @private
   */
  constructor(protected state: AtxMonitoringConsoleState,
              //--> Conponent scope services:
              private _ctrl: AtxMonitoringConsoleController,
              private _io: AtxLogIoService,
              private _input: AtxUserActionService) {}
}
