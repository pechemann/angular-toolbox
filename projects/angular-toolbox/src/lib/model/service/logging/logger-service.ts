/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from "@angular/core";
import { AbstractLogger } from "../../../framework";

/**
 * A convenient high-level singleton that implements the `Logger` interface.
 */
@Injectable({
    providedIn: 'root'
})
export class LoggerService extends AbstractLogger {}