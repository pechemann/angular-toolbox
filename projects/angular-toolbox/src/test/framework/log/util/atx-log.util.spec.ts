/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxLog, AtxLogBuilder, AtxLogLevel, AtxLogUtil, EMPTY_STRING } from "projects/angular-toolbox/src/public-api";

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

describe('AtxLogUtil', () => {

    it('dateToHHMMSS() should format a timestamp correctly', () => {
        const now: number = Date.now();
        const formated: string = AtxLogUtil.dateToHHMMSS(now);
        expect(TIME_REGEXP.test(formated)).toBeTrue();
    });

    it('metadataToString() should format a metadata object correctly', () => {
        const expected: string = '[foo="FOO", bar="BAR", num=0, nested=[id=null, data=undefined]]';
        const formated: string = AtxLogUtil.metadataToString(METADATA);
        expect(formated).toEqual(expected);
    });

    it('metadataToString() should return an empty string when metadata object has no property', () => {
        const formated: string = AtxLogUtil.metadataToString({});
        expect(formated).toEqual(EMPTY_STRING);
    });

    it('metadataToString() should return an empty string when metadata object is null', () => {
        const formated: string = AtxLogUtil.metadataToString(null);
        expect(formated).toEqual(EMPTY_STRING);
    });

    it('metadataToString() should return an empty array string when metadata object is an empty array', () => {
        const formated: string = AtxLogUtil.metadataToString([]);
        expect(formated).toEqual("[]");
    });

    it('logListToString() should return an empty string when the list of logs is empty', () => {
        const logList: AtxLog[] = [];
        const formated: string = AtxLogUtil.logListToString(logList);
        expect(formated).toEqual(EMPTY_STRING);
    });

    it('logListToString() should format a list of logs correctly', () => {
        const logList: AtxLog[] = [
            AtxLogBuilder.build(CALLER, LOG_MESSAGE, AtxLogLevel.LOG, METADATA),
            AtxLogBuilder.build(CALLER, LOG_MESSAGE, AtxLogLevel.WARNING),
            AtxLogBuilder.build(CALLER, LOG_MESSAGE, AtxLogLevel.ERROR)
        ];
        const formated: string = AtxLogUtil.logListToString(logList);
        console.log(formated);
        //expect(formated).toEqual(EMPTY_STRING);
    });
});
