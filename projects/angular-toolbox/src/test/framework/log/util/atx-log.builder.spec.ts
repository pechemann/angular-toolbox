/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxLog, AtxLogBuilder, AtxLogLevel } from "projects/angular-toolbox/src/public-api";

const CALLER: string = "testSuite";
const LOG_MESSAGE: string = "Log message";

describe('AtxLogBuilder', () => {

    it('should build an AtxLog object', () => {
        const log: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE);
        expect(log.hasOwnProperty("caller")).toBeTrue();
        expect(log.hasOwnProperty("message")).toBeTrue();
        expect(log.hasOwnProperty("level")).toBeTrue();
        expect(log.hasOwnProperty("timestamp")).toBeTrue();
        expect(log.hasOwnProperty("metadata")).toBeTrue();
    });
    
    it('should build distincs AtxLog object', () => {
        const log1: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE);
        const log2: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE);
        expect(log1).not.toBe(log2);
    });
    
    it('default log level should be AtxLogLevel.LOG', () => {
        const log: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE);
        expect(log.level).toEqual(AtxLogLevel.LOG);
    });
    
    it('default log metadata should be undefined', () => {
        const log: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE);
        expect(log.metadata).toBeUndefined();
    });
    
    it('log.timestamp should be a number', () => {
        const log: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE);
        expect(log.timestamp).toEqual(jasmine.any(Number));
    });
    
    it('log.caller should be equal to the specified "caller" parameter', () => {
        const log: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE);
        expect(log.caller).toEqual(CALLER);
    });
    
    it('log.message should be equal to the specified "message" parameter', () => {
        const log: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE);
        expect(log.message).toEqual(LOG_MESSAGE);
    });
    
    it('log.level should be equal to the specified "level" parameter', () => {
        const log: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE, AtxLogLevel.ERROR);
        expect(log.level).toEqual(AtxLogLevel.ERROR);
    });
    
    it('log.metadata should be equal to the specified "metadata" parameter', () => {
        const metadata: any = {
            foo: 1,
            bar: "bar"
        };
        const log: AtxLog = AtxLogBuilder.build(CALLER, LOG_MESSAGE, AtxLogLevel.ERROR, metadata);
        expect(log.metadata).toEqual(metadata);
    });
});
