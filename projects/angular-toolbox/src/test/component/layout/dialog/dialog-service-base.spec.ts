/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DialogServiceBase } from "projects/angular-toolbox/src/public-api";

describe('DialogServiceBase', () => {

    it('should create a new instance', () => {
        const elm: DialogServiceBase = new DialogServiceBase();
        expect(elm).toBeTruthy();
    });
});