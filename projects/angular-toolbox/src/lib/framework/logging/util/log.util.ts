/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { formatDate } from "@angular/common";
import { Log } from "../../../model";
import { LogLevel, EMPTY_STRING, OBJECT, STRING } from "../../../util";

/**
 * @private
 */
const TS_FMT: string = "HH:MM:SS";

/**
 * @private
 */
const ERROR_STRING: string = "[ERROR]";

/**
 * @private
 */
const SEPARATOR: string = ", ";

/**
 * @private
 */
const R_BRACKET: string = "[";

/**
 * @private
 */
const L_BRACKET: string = "]";

/**
 * @private
 */
const LOCALE: string = "en-us";

/**
 * @private
 */
const getStringEnd: Function = (cusror: number, size: number) => {
    return cusror !== size ? SEPARATOR : EMPTY_STRING;
}

/**
 * A convenient utility class for formatting logs.
 */
export class LogUtil {

    /**
     * Turns the specified log list into a human redeable string.
     * 
     * @param logList The list of logs to format.
     * @returns The formatted log list.
     */
    public static logListToString(logList: Log[]): string {
        const len: number = logList.length - 1;
        let logs: string = EMPTY_STRING,
            i: number = 0;
        for(; i <= len; ++i) {
            const log: Log = logList[i];
            const errorTxt: string = log.level === LogLevel.LOG ? EMPTY_STRING : ERROR_STRING;
            logs += `[${LogUtil.dateToHHMMSS(log.timestamp)}]${errorTxt}[${log.caller}][${log.message}][${LogUtil.metadataToString(log.metadata)}]\n`;
        }
        return logs;
    }

    /**
     * Return a string that represents the specified metadata object.
     * 
     * @param obj The metadata object to format.
     * @returns A string that represents the specified metadata object.
     */
    public static metadataToString(obj: any): string {
        let result: string = EMPTY_STRING;
        if (!obj) return result;
        if (Array.isArray(obj)) return LogUtil.formatArray(obj);
        const keys: string[] = Object.keys(obj),
              len: number = keys.length - 1;
        let i: number = 0;
        for(; i <= len; ++i) {
            const key: string = keys[i];
            const value: any = obj[key];
            if (value === null) result += `${key}=null${getStringEnd(i, len)}`;
            else if (value === undefined) result += `${key}=undefined${getStringEnd(i, len)}`;
            else if (typeof value === STRING) result += `${key}="${value}"${getStringEnd(i, len)}`;
            else if (Array.isArray(value)) result += `${key}=${LogUtil.formatArray(value)}${getStringEnd(i, len)}`;
            else if (typeof value === OBJECT) result += `${key}=${LogUtil.metadataToString(value)}${getStringEnd(i, len)}`;
            else result += `${key}=${value}${getStringEnd(i, len)}`;
        };
        if(result.endsWith(SEPARATOR)) {
            result = result.slice(0, - 2);
        }
        return result !== EMPTY_STRING ? R_BRACKET + result + L_BRACKET : result;
    }
    
    /**
     * Returns a string that represents the specified timestamp in form `"HH:MM:SS"`.
     * 
     * @param timestamp The timestamp to format.
     * @returns A string that represents the specified timestamp in form `"HH:MM:SS"`.
     */
    public static dateToHHMMSS(timestamp: number): string {
        return formatDate(timestamp, TS_FMT, LOCALE);
    }
    
    /**
     * Returns a string that represents the specified array.
     * 
     * @param array The array to format.
     * @returns A tring that represents the specified array.
     */
    private static formatArray(array: any[]): string {
        const len: number = array.length - 1;
        let i: number = 0,
            result: string = EMPTY_STRING;
        for(; i <= len; ++i) {
            const value: any = array[i];
            if (typeof value === STRING) result += `"${value}"${getStringEnd(i, len)}`;
            else if (Array.isArray(value)) result += `${LogUtil.formatArray(value)}${getStringEnd(i, len)}`;
            else if (typeof value === OBJECT) result += `${LogUtil.metadataToString(value)}${getStringEnd(i, len)}`;
            else result += `${value}${getStringEnd(i, len)}`;
        }
        return `[${result}]`;
    }
}