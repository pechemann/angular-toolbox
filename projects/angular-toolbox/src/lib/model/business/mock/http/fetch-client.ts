/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Observable } from "rxjs";

/**
 * The markup interface for `Observable` object built from the Fetch API.
 */
export interface FetchClient extends Observable<any> {}
