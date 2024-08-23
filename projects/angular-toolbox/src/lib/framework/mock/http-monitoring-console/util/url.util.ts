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

/**
 * @private
 * A utility class for managing request resources path.
 */
export class UrlUtil {

    /**
     * @private
     * Returns the resource name from the specified HTTP log.
     * 
     * @param log The HTTP log for which to get the resource name.
     * @returns A string that represents the resource name of the specified HTTP log.
     */
    public static getResourceName(log: Log): string {
        return UrlUtil.getResourceNameFromPath(UrlUtil.getResourcePath(log));
    }

    /**
     * @private
     * Returns the resource name from the specified URL path.
     * 
     * @param pathname The URL path for which to get the resource name.
     * @returns A string that represents the resource name of the specified URL path.
     */
    public static getResourceNameFromPath(pathname: string): string {
        const pos: number = pathname.length - 1;
        if (pathname.lastIndexOf(SLASH) === pos) pathname = pathname.substring(0, pos);
        return pathname.substring(pathname.lastIndexOf(SLASH) + 1);
    }

    /**
     * @private
     * Returns the resource path from the specified HTTP log.
     * 
     * @param log The HTTP log for which to get the resource path.
     * @returns A string that represents the resource path of the specified HTTP log.
     */
    public static getResourcePath(log: Log): string {
        return log.metadata.requestMetadata.url.pathname;
    }
}
