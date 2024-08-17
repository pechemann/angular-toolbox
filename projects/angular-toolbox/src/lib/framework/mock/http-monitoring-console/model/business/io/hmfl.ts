/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxHttpLogDto } from "./atx-http-log.dto";


export interface HMFL {
    logs: AtxHttpLogDto[];
    timestamp: number;
}