/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockRequestMetadata } from "../../../../model";
import { AtxTimelineData } from "../model/business/atx-timeline-data";

/**
 * @private
 * A utility class for computing the timeline data of an HTTP request.
 */
export class TimelineUtil {

    /**
     * @private
     * Returns the timeline data for the specified HTTP log.
     * 
     * @param metadata The HTTP metadata for which to get the timeline data.
     * @returns A `AtxTimelineData` object.
     */
    public static getTimelineData(metadata: HttpMockRequestMetadata): AtxTimelineData {
        const duration: number = metadata.duration;
        if (duration === 0) return { downloadStart: 0, downloadLength: 0 };
        const downloadLength: number = Math.round(100 * (duration - metadata.stalled) / duration);
        return { downloadStart: 100 - downloadLength, downloadLength: downloadLength };
    }
}
