/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Log } from '../../../../../../model';
import { ATX_IS_IMPORTED_LOG } from '../../../model/business/atx-is-imported-log';
import { ConsoleBodyType } from '../../../util/console-body-type';
import { DataUtil } from '../../../util/data.util';
import { HttpResponse } from '@angular/common/http';
import { AtxSpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'atx-icon-renderer',
  standalone: true,
  templateUrl: './icon-renderer.component.html',
  styleUrl: './icon-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AtxSpinnerComponent
  ]
})
export class AtxIconRendererComponent {

  protected bodyType: ConsoleBodyType = ConsoleBodyType.INVALID;
  protected hasReponse: boolean = false;

  @Input()
  public set data(log: Log) {
    const response: HttpResponse<any> = log.metadata.response;
    const complete: boolean = response !== null && response !== undefined;
    this.hasReponse = complete;
    if (complete) this.bodyType = DataUtil.getBodyType(response.body);
    this.log = log;
    this.isImported = log.metadata.request?.context.get(ATX_IS_IMPORTED_LOG);
  }

  protected isImported: boolean = false;
  protected log!: Log;
}
