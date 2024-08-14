/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ResponseDelay } from "../core/response-delay";
import { HTTP_MOCK_MAX_DELAY } from "./http-mock-max-delay";

/**
 * @private
 * A utility for managing HTTP responses delay.
 */
export class HttpMockResponseDelayUtil {

    /**
     * @private
     * A utility function that return a `ResponseDelay` object, depending on the timer parameters.
     * 
     * @param timer The seed value used to create the  `ResponseDelay` object.
     * @returns A `ResponseDelay` object.
     */
    public static getResponseDelay(timer: number): ResponseDelay {
        const duration: number = (timer <= HTTP_MOCK_MAX_DELAY) ? timer : HTTP_MOCK_MAX_DELAY;
        return {
            stalled: (timer > 0 ? Math.random() * duration : 0) | 0,
            duration: duration
        };
    }
}
