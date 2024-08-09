/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log, LogBuilder, LogLevel, LogUtil, EMPTY_STRING } from "projects/angular-toolbox/src/public-api";

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

describe('LogUtil', () => {

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
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.LOG, METADATA),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.WARNING),
            LogBuilder.build(CALLER, LOG_MESSAGE, LogLevel.ERROR)
        ];
        const formated: string = LogUtil.logListToString(logList);
        console.log(formated);
        //expect(formated).toEqual(EMPTY_STRING);
    });
});
