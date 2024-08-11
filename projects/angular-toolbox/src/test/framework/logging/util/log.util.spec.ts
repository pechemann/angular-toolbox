/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log, LogBuilder, LogLevel, LogUtil, EMPTY_STRING, LOG_INFO_STRING, LOG_WARNING_STRING, LOG_ERROR_STRING, LOG_CONFIG_STRING } from "projects/angular-toolbox/src/public-api";

const CALLER: string = "testSuite";
const LOG_MESSAGE: string = "Log message";
const TIME_REGEXP: RegExp = /\d{2}:\d{2}:\d{2}/;
const METADATA: any = {
    foo: "FOO",
    bar: "BAR",
    num: 0,
    nested: {
        id: null,
        data: undefined
    }
};
const FORMATTED_LOG_REGEXP:RegExp = /\[\d{2}:\d{2}:\d{2}\]\[(INFO|WARNING|CONFIG|ERROR)\](\[.*\]){2}/gm;

describe('LogUtil', () => {

    it('getLevelString() should return LOG_INFO_STRING when log level is LogLevel.INFO', () => {
        expect(LogUtil.getLevelString(LogLevel.INFO)).toEqual(LOG_INFO_STRING);
    });

    it('getLevelString() should return LOG_INFO_STRING when log level is LogLevel.CONFIG', () => {
        expect(LogUtil.getLevelString(LogLevel.CONFIG)).toEqual(LOG_CONFIG_STRING);
    });

    it('getLevelString() should return LOG_WARNING_STRING when log level is LogLevel.WARNING', () => {
        expect(LogUtil.getLevelString(LogLevel.WARNING)).toEqual(LOG_WARNING_STRING);
    });

    it('getLevelString() should return LOG_ERROR_STRING when log level is LogLevel.ERROR', () => {
        expect(LogUtil.getLevelString(LogLevel.ERROR)).toEqual(LOG_ERROR_STRING);
    });

    it('dateToHHMMSS() should format a timestamp correctly', () => {
        const now: number = Date.now();
        const formated: string = LogUtil.dateToHHMMSS(now);
        expect(TIME_REGEXP.test(formated)).toBeTrue();
    });

    it('metadataToString() should format a metadata object correctly', () => {
        const expected: string = '[foo="FOO", bar="BAR", num=0, nested=[id=null, data=undefined]]';
        const formated: string = LogUtil.metadataToString(METADATA);
        expect(formated).toEqual(expected);
    });

    it('metadataToString() should return an empty string when metadata object has no property', () => {
        const formated: string = LogUtil.metadataToString({});
        expect(formated).toEqual(EMPTY_STRING);
    });

    it('metadataToString() should return an empty string when metadata object is null', () => {
        const formated: string = LogUtil.metadataToString(null);
        expect(formated).toEqual(EMPTY_STRING);
    });

    it('metadataToString() should return an empty array string when metadata object is an empty array', () => {
        const formated: string = LogUtil.metadataToString([]);
        expect(formated).toEqual("[]");
    });

    it('logListToString() should return an empty string when the list of logs is empty', () => {
        const logList: Log[] = [];
        const formated: string = LogUtil.logListToString(logList);
        expect(formated).toEqual(EMPTY_STRING);
    });

    it('logListToString() should format a list of logs correctly', () => {
        const logList: Log[] = [
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.INFO, METADATA),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.WARNING),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.ERROR),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.CONFIG)
        ];
        const formated: string = LogUtil.logListToString(logList);
        expect(formated.match(FORMATTED_LOG_REGEXP)?.length).toEqual(4);
    });

    it('logListToString() should format a list of logs in separated lines', () => {
        const logList: Log[] = [
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.INFO, METADATA),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.WARNING),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.ERROR),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.CONFIG)
        ];
        const formated: string = LogUtil.logListToString(logList);
        expect(formated.match(/\n/gm)?.length).toEqual(4);
    });

    it('logListToString() should contain references to all callers', () => {
        const logList: Log[] = [
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.INFO, METADATA),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.WARNING),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.ERROR),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.CONFIG)
        ];
        const formated: string = LogUtil.logListToString(logList);
        const regexp = new RegExp(CALLER, "gm");
        expect(formated.match(regexp)?.length).toEqual(4);
    });

    it('logListToString() should contain referencse to all messages', () => {
        const logList: Log[] = [
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.INFO, METADATA),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.WARNING),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.ERROR),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.CONFIG)
        ];
        const formated: string = LogUtil.logListToString(logList);
        const regexp = new RegExp(LOG_MESSAGE, "gm");
        expect(formated.match(regexp)?.length).toEqual(4);
    });

    it('logListToString() should contain references to all log levels', () => {
        const logList: Log[] = [
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.INFO, METADATA),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.WARNING),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.ERROR),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.CONFIG)
        ];
        const formated: string = LogUtil.logListToString(logList);
        const logRegexp = new RegExp(LOG_INFO_STRING, "gm");
        expect(formated.match(logRegexp)?.length).toEqual(1);
        const warnRegexp = new RegExp(LOG_WARNING_STRING, "gm");
        expect(formated.match(warnRegexp)?.length).toEqual(1);
        const errorRegexp = new RegExp(LOG_ERROR_STRING, "gm");
        expect(formated.match(errorRegexp)?.length).toEqual(1);
        const configRegexp = new RegExp(LOG_CONFIG_STRING, "gm");
        expect(formated.match(configRegexp)?.length).toEqual(1);
    });

    it('logListToString() should contain references to all metadata', () => {
        const logList: Log[] = [
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.INFO, METADATA),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.WARNING),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.ERROR, METADATA),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.CONFIG)
        ];
        const formatedMetadata: string = LogUtil.metadataToString(METADATA);
        const formated: string = LogUtil.logListToString(logList);
        expect(formated.split(formatedMetadata).length).toEqual(3);
    });
});
