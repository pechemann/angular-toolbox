/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { UrlUtil } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/url.util";
import { EMPTY_STRING, Log, LogBuilder, LogLevel } from "projects/angular-toolbox/src/public-api";

describe('UrlUtil', () => {

    it('getResourcePath() should return the url path of the specified log', () => {
        const url: URL = new URL("http://foo.com/bar");
        const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, { requestMetadata: { url: url } });
        expect(UrlUtil.getResourcePath(log)).toEqual("/bar");
    });

    it('getResourceNameFromPath() should return the resource name from the specified url path', () => {
        expect(UrlUtil.getResourceNameFromPath("foo/bar")).toEqual("bar");
    });

    it('getResourceNameFromPath() should return the resource name from the specified url path even when it ends with a slash character', () => {
        expect(UrlUtil.getResourceNameFromPath("foo/bar/")).toEqual("bar");
    });
    
    it('getResourceName() should return the resource name from the specified log', () => {
        const url: URL = new URL("http://foo.com/foo/bar");
        const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, { requestMetadata: { url: url } });
        expect(UrlUtil.getResourceName(log)).toEqual("bar");
    });
    
    it('getResourceName() should return the resource name from the specified log even when it ends with a slash character', () => {
        const url: URL = new URL("http://foo.com/foo/bar/");
        const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, { requestMetadata: { url: url } });
        expect(UrlUtil.getResourceName(log)).toEqual("bar");
    });
});
