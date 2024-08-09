/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from "@angular/core";
import { AtxAbstractLogger } from "../../../framework";

/**
 * A convenient high-level singleton that implements the `AtxLogger` interface.
 */
@Injectable({
    providedIn: 'root'
})
export class AtxLoggerService extends AtxAbstractLogger {}