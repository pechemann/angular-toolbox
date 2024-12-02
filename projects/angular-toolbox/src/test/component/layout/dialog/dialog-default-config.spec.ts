/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DEFAULT_CONFIG } from "projects/angular-toolbox/src/lib/component/dialog/dialog-default-config";
import { DialogBackdropType } from "projects/angular-toolbox/src/public-api";

describe('DEFAULT_CONFIG', () => {

    it('DEFAULT_CONFIG.backdrop should should be DialogBackdropType.MODAL', () => {
        expect(DEFAULT_CONFIG.backdrop).toEqual(DialogBackdropType.MODAL);
    });
});