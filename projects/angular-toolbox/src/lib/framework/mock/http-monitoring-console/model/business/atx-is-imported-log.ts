/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpContextToken } from "@angular/common/http";

export const ATX_IS_IMPORTED_LOG: HttpContextToken<boolean> = new HttpContextToken<boolean>(() => false);