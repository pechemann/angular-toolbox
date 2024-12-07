/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { Log } from '../../../../../../model';
import { HttpResponse } from '@angular/common/http';
import { SizeUtil } from '../../../util/size.util';
import { UrlUtil } from '../../../util/url.util';
import { AtxIconRendererComponent } from '../icon-renderer/icon-renderer.component';
import { AtxMonitoringConsoleState } from '../../../model/service/atx-monitoring-console.state';
import { AtxUserActionService } from '../../../model/service/atx-user-action.service';
import { AtxConsoleActionType } from '../../../model/business/atx-console-action-type';

/**
 * @private
 */
const TPL_DASH: string = "---";

/**
 * @private
 */
const PREFETCH: string = "prefetch";

/**
 * @private
 */
const MS_SUFIX: string = " ms";

/**
 * @private
 * The component that layouts HTTP logs via a table element in the ATX monitoring console.
 */
@Component({
    selector: 'atx-request-list-renderer',
    imports: [
        AtxIconRendererComponent
    ],
    templateUrl: './request-list-renderer.component.html',
    styleUrl: './request-list-renderer.component.scss'
})
export class AtxRequestListRendererComponent {
  
  /**
   * @private
   */
  protected readonly actionType: any = AtxConsoleActionType;

  /**
   * @private
   */
  constructor(protected state: AtxMonitoringConsoleState,
              protected action: AtxUserActionService) {}

  /**
   * @private
   * Returns the data size for the specified log.
   */
  protected getSize(log: Log): string {
    const response: HttpResponse<any> | null = log.metadata.response;
    if (response) {
      const size: number = SizeUtil.getSize(response.body);
      return SizeUtil.sizeToString(size);
    }
    return TPL_DASH;
  }

  /**
   * @private
   * Returns the HTTP status for the specified log.
   */
  protected getStatus(log: Log): string | number { const response: HttpResponse<any> | null = log.metadata.response;
    if (response) return response.status;
    return PREFETCH;
  }
  
  /**
   * @private
   * Returns the transaction duration for the specified log.
   */
  protected getTime(log: Log): string {
    const response: HttpResponse<any> | null = log.metadata.response;
    if (response) return log.metadata.requestMetadata.duration + MS_SUFIX;
    return TPL_DASH;
  }

  /**
   * @private
   * RIndicates whether the specified log is an error (true), or not (false).
   */
  protected isError(log: Log): boolean {
    const response: HttpResponse<any> | null = log.metadata.response;
    if (response) return response.status >= 400;
    return false;
  }
  
  /**
   * @private
   * Returns the resource name for the specified log.
   */
  protected getResourceName(log: Log): string {
    return UrlUtil.getResourceName(log);
  }
  
  /**
   * @private
   * Returns the resource path for the specified log.
   */
  protected getResourcePath(log: Log): string {
    return UrlUtil.getResourcePath(log);
  }

  /**
   * @private
   * Applies user's filters to the spefivied log (previously unreleased).
   */
  protected checkFilters(log: Log): boolean {
    return true;
  }
}
