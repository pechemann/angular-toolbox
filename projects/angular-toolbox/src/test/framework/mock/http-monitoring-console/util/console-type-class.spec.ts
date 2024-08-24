/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleTypeClass } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/console-type-class";

describe('ConsoleTypeClass', () => {

    it('ConsoleTypeClass.OBJECT should equal "atx-object"', () => {
        expect(ConsoleTypeClass.OBJECT).toEqual("atx-object");
    });

    it('ConsoleTypeClass.STRING should equal "atx-string"', () => {
        expect(ConsoleTypeClass.STRING).toEqual("atx-string");
    });
    
    it('ConsoleTypeClass.NUMBER should equal "atx-number"', () => {
        expect(ConsoleTypeClass.NUMBER).toEqual("atx-number");
    });
    
    it('ConsoleTypeClass.BOOLEAN should equal "atx-boolean"', () => {
        expect(ConsoleTypeClass.BOOLEAN).toEqual("atx-boolean");
    });
    
    it('ConsoleTypeClass.ARRAY should equal "atx-array"', () => {
        expect(ConsoleTypeClass.ARRAY).toEqual("atx-array");
    });
    
    it('ConsoleTypeClass.NULL should equal "atx-null"', () => {
        expect(ConsoleTypeClass.NULL).toEqual("atx-null");
    });
});
