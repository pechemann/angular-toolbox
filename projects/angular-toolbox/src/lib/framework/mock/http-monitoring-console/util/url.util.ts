/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log } from "../../../../model";

/**
 * @private
 */
const SLASH: string = "/";

export class UrlUtil {

    public static getResourceName(log: Log): string {
        const pathname: string = log.metadata.requestMetadata.url.pathname;
        return pathname.substring(pathname.lastIndexOf(SLASH) + 1);
    }

    public static getResourcePath(log: Log): string {
        return log.metadata.requestMetadata.url.pathname;
    }
    
}
