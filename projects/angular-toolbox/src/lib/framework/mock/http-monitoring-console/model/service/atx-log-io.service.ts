/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from "@angular/core";
import { Log } from '../../../../../model';

@Injectable()
export class AtxLogIoService {


    public exportToFile(logs: Log[]): void {
        const exportData = {
          logs: logs,
          date: Date.now()
        };
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(exportData)], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = "logs.hmfl";
        a.click();
      }
}