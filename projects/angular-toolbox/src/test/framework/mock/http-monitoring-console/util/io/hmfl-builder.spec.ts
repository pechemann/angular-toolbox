/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HMFLBuilder } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/hmfl-builder";

describe('HMFLBuilder', () => {

    it('build() should return a new HMFL object', () => {
        const result: any = HMFLBuilder.build([]);
        expect(result.hasOwnProperty("logs")).toBeTrue();
        expect(result.hasOwnProperty("timestamp")).toBeTrue();
    });
    
    it('build() should return a new HMFL object with a valid timestamp', () => {
        const ts: number = Date.now();
        spyOn(Date, 'now').and.returnValue(ts);
        const result: any = HMFLBuilder.build([]);
        expect(result.timestamp).toEqual(ts);
    });
    
    it('build() should return a new HMFL object with a specified log list timestamp', () => {
        const logs: any[] = [ null, undefined ];
        const result: any = HMFLBuilder.build(logs);
        expect(result.logs).toBe(logs);
    });
});
