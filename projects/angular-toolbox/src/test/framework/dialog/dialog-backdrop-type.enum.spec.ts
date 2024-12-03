/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DialogBackdropType } from "projects/angular-toolbox/src/public-api";

describe('DialogBackdropType', () => {

    it('DialogBackdropType.MODAL should should be "modal"', () => {
        expect(DialogBackdropType.MODAL).toEqual("modal");
    });

    it('DialogBackdropType.STATIC should should be "static"', () => {
        expect(DialogBackdropType.STATIC).toEqual("static");
    });
});