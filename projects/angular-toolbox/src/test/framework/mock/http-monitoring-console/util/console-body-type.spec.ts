/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleBodyType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/console-body-type";

describe('ConsoleBodyType', () => {

    it('ConsoleBodyType.INVALID should equal -1', () => {
        expect(ConsoleBodyType.INVALID).toEqual(-1);
    });

    it('ConsoleBodyType.NULL should equal 0', () => {
        expect(ConsoleBodyType.NULL).toEqual(0);
    });

    it('ConsoleBodyType.JSON should equal 1', () => {
        expect(ConsoleBodyType.JSON).toEqual(1);
    });

    it('ConsoleBodyType.TEXT should equal 2', () => {
        expect(ConsoleBodyType.TEXT).toEqual(2);
    });

    it('ConsoleBodyType.BLOB should equal 3', () => {
        expect(ConsoleBodyType.BLOB).toEqual(3);
    });

    it('ConsoleBodyType.FORM_DATA should equal 4', () => {
        expect(ConsoleBodyType.FORM_DATA).toEqual(4);
    });

    it('ConsoleBodyType.ARRAY_BUFFER should equal 5', () => {
        expect(ConsoleBodyType.ARRAY_BUFFER).toEqual(5);
    });
});
