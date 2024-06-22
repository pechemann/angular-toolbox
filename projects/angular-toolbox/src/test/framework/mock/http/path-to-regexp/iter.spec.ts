/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Iter } from "../../../../../lib/framework/mock/http/path-to-regexp/iter";

describe('Iter', () => {

    let iter: Iter;
    
    it('should create an instance', () => {
        iter = new Iter([]);
        expect(iter).toBeTruthy();
    });
    
});
