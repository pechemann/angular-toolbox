/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log, LogImpl, LogLevel } from "projects/angular-toolbox/src/public-api";

const CALLER: string = "testSuite";
const LOG_MESSAGE: string = "Log message";
const LOG_LEVEL: LogLevel = LogLevel.ERROR;

describe('LogImpl', () => {

    it('should implement the Log interface', () => {
        const log: Log = new LogImpl(CALLER, LOG_MESSAGE, LOG_LEVEL);
        expect(log.hasOwnProperty("caller")).toBeTrue();
        expect(log.hasOwnProperty("message")).toBeTrue();
        expect(log.hasOwnProperty("level")).toBeTrue();
        expect(log.hasOwnProperty("timestamp")).toBeTrue();
        expect(log.hasOwnProperty("metadata")).toBeTrue();
    });
    
    
    it('default log metadata should be undefined', () => {
        const log: Log = new LogImpl(CALLER, LOG_MESSAGE, LOG_LEVEL);
        expect(log.metadata).toBeUndefined();
    });
    
    it('log.timestamp should be a number', () => {
        const log: Log = new LogImpl(CALLER, LOG_MESSAGE, LOG_LEVEL);
        expect(log.timestamp).toEqual(jasmine.any(Number));
    });

    it('log.caller should be equal to the specified "caller" parameter', () => {
        const log: Log = new LogImpl(CALLER, LOG_MESSAGE, LOG_LEVEL);
        expect(log.caller).toEqual(CALLER);
    });

    it('log.message should be equal to the specified "message" parameter', () => {
        const log: Log = new LogImpl(CALLER, LOG_MESSAGE, LOG_LEVEL);
        expect(log.message).toEqual(LOG_MESSAGE);
    });

    it('log.level should be equal to the specified "level" parameter', () => {
        const log: Log = new LogImpl(CALLER, LOG_MESSAGE, LOG_LEVEL);
        expect(log.level).toEqual(LogLevel.ERROR);
    });

    it('log.metadata should be equal to the specified "metadata" parameter', () => {
        const metadata: any = {
            foo: 1,
            bar: "bar"
        };
        const log: Log = new LogImpl(CALLER, LOG_MESSAGE, LOG_LEVEL, metadata);
        expect(log.metadata).toEqual(metadata);
    });
});
