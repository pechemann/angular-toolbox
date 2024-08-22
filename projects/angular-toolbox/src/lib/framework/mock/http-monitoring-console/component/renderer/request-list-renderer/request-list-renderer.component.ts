/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Log } from '../../../../../../model';
import { HttpResponse } from '@angular/common/http';
import { SizeUtil } from '../../../util/size.util';
import { ATX_IS_IMPORTED_LOG } from '../../../model/business/atx-is-imported-log';
import { UrlUtil } from '../../../util/url.util';
import { AtxIconRendererComponent } from '../icon-renderer/icon-renderer.component';
import { AtxMonitoringConsoleState } from '../../../model/service/atx-monitoring-console.state';
import { AtxUserActionService } from '../../../model/service/atx-user-action.service';
import { AtxConsoleActionType } from '../../../model/business/atx-console-action-type';

const TPL_DASH: string = "---";
const PREFETCH: string = "prefetch";
const MS_SUFIX: string = " ms";

@Component({
  selector: 'atx-request-list-renderer',
  standalone: true,
  imports: [
    AtxIconRendererComponent
  ],
  templateUrl: './request-list-renderer.component.html',
  styleUrl: './request-list-renderer.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxRequestListRendererComponent {
  
  protected readonly actionType: any = AtxConsoleActionType;

  constructor(protected state: AtxMonitoringConsoleState,
              protected action: AtxUserActionService) {}

  protected getSize(log: Log): string {
    const response: HttpResponse<any> | null = log.metadata.response;
    if (response) {
      const size: number = SizeUtil.getSize(response.body);
      return SizeUtil.sizeToString(size);
    }
    return TPL_DASH;
  }

  protected getStatus(log: Log): string | number { const response: HttpResponse<any> | null = log.metadata.response;
    if (response) return response.status;
    return PREFETCH;
  }

  protected getTime(log: Log): string {
    const response: HttpResponse<any> | null = log.metadata.response;
    if (response) return log.metadata.requestMetadata.duration + MS_SUFIX;
    return TPL_DASH;
  }

  protected isError(log: Log): boolean {
    const response: HttpResponse<any> | null = log.metadata.response;
    if (response) return response.status >= 400;
    return false;
  }

  protected isImported(log: Log): boolean {
    return log.metadata.request?.context.get(ATX_IS_IMPORTED_LOG);
  }
  
  protected getResourceName(log: Log): string {
    return UrlUtil.getResourceName(log);
  }
  
  protected getResourcePath(log: Log): string {
    return UrlUtil.getResourcePath(log);
  }

  protected checkFilters(log: Log): boolean {
    return true;
  }
}
