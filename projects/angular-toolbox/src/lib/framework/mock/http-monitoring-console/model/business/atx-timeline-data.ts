/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 * Defines data used to render the timeline of an HTTP request.
 */
export interface AtxTimelineData {

    /**
     * The starting point of the download, in percentage.
     */
    downloadStart: number;

    /**
     * The durration of the download, in percentage.
     */
    downloadLength: number;
}
