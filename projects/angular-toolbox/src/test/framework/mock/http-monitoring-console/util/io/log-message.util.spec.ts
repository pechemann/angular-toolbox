/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LogMessageUtil } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/log-message.util";
import { HttpMockLoggingConstant } from "projects/angular-toolbox/src/lib/model/business/logging/http-mock-logging-constant.enum";
import { LogLevel } from "projects/angular-toolbox/src/public-api";

describe('LogMessageUtil', () => {

    it('getMessageFromLevel() should return HttpMockLoggingConstant.RESPONSE_MESSAGE when level is LogLevel.INFO', () => {
        expect(LogMessageUtil.getMessageFromLevel(LogLevel.INFO)).toEqual(HttpMockLoggingConstant.RESPONSE_MESSAGE);
    });
    
    it('getMessageFromLevel() should return HttpMockLoggingConstant.ERROR_MESSAGE when level is LogLevel.ERROR', () => {
        expect(LogMessageUtil.getMessageFromLevel(LogLevel.ERROR)).toEqual(HttpMockLoggingConstant.ERROR_MESSAGE);
    });
    
    it('getMessageFromLevel() should return HttpMockLoggingConstant.CONFIG_MESSAGE when level is LogLevel.CONFIG', () => {
        expect(LogMessageUtil.getMessageFromLevel(LogLevel.CONFIG)).toEqual(HttpMockLoggingConstant.CONFIG_MESSAGE);
    });
    
    it('getMessageFromLevel() should return HttpMockLoggingConstant.CONFIG_MESSAGE when level is LogLevel.WARNING', () => {
        expect(LogMessageUtil.getMessageFromLevel(LogLevel.WARNING)).toEqual(HttpMockLoggingConstant.CONFIG_MESSAGE);
    });
    
    it('getMessageFromLevel() should return HttpMockLoggingConstant.CONFIG_MESSAGE when level is LogLevel.OFF', () => {
        expect(LogMessageUtil.getMessageFromLevel(LogLevel.OFF)).toEqual(HttpMockLoggingConstant.CONFIG_MESSAGE);
    });
});
