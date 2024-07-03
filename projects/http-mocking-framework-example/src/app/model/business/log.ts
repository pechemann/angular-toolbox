/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

export enum LogLevel {
    DEBUG = 0,
    ERROR = 1
}

export interface Log {
    message: string;
    timestamp: number;
    level: LogLevel;
}