/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TimelineUtil } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/timeline.util";
import { buildRequestMetadata } from "../test-util/http-monitoring-test-util";

describe('TimelineUtil', () => {

    it('getTimelineData() should return an AtxTimelineData object', () => {
        const result = TimelineUtil.getTimelineData(buildRequestMetadata());
        expect(result.hasOwnProperty("downloadStart")).toBeTrue();
        expect(result.hasOwnProperty("downloadLength")).toBeTrue();
    });
    
    it('getTimelineData() should return an AtxTimelineData object initialized to 0 when request duration is 0', () => {
        const metadata = buildRequestMetadata();
        metadata.duration = 0;
        const result = TimelineUtil.getTimelineData(metadata);
        expect(result.downloadStart).toEqual(0);
        expect(result.downloadLength).toEqual(0);
    });

    it('total duration shoud be 100', () => {
        const result = TimelineUtil.getTimelineData(buildRequestMetadata());
        expect(result.downloadStart + result.downloadLength).toEqual(100);
    });
});
