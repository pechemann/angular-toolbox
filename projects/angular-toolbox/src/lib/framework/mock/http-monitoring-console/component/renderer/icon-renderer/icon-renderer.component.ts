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
import { AtxLogRendererBase } from '../../abstract/log-renderer-base';

/**
 * @private
 * The component responsible for managing icons the ATX monitoring console.
 */
@Component({
    selector: 'atx-icon-renderer',
    templateUrl: './icon-renderer.component.html',
    styleUrl: './icon-renderer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AtxSpinnerComponent
    ]
})
export class AtxIconRendererComponent extends AtxLogRendererBase {

  /**
   * @private
   */
  protected bodyType: ConsoleBodyType = ConsoleBodyType.INVALID;

  /**
   * @private
   */
  protected hasReponse: boolean = false;
  
  /**
   * @private
   */
  protected isImported: boolean = false;

  /**
   * @private
   */
  @Input()
  public override set log(value: Log | null) {
    super.log = value;
    if (!value) {
      this.hasReponse = this.isImported = false;
      this.bodyType = ConsoleBodyType.INVALID;
      return;
    }
    const response: HttpResponse<any> = value.metadata.response;
    const complete: boolean = response !== null && response !== undefined;
    this.hasReponse = complete;
    this.bodyType = complete ? DataUtil.getBodyType(response.body) : ConsoleBodyType.INVALID;
    this.isImported = value.metadata.request?.context.get(ATX_IS_IMPORTED_LOG);
  }
}
