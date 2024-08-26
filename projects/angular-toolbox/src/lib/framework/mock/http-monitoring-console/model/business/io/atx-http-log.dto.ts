/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LogLevel } from "../../../../../../model";
import { AtxHttpLogMetadataDto } from "./atx-http-log-metadata.dto";

/**
 * @private
 * The interface that must be implementd by ATX HTTP log DTOs.
 */
export interface AtxHttpLogDto {
    
    /**
     * @private
     * The criticality level of this log dto.
     */
    level: LogLevel;

    /**
     * @private
     * The timestamp at which the original log has been created.
     */
    timestamp: number;

    /**
     * @private
     * Metada associated with the original log.
     */
    metadata: AtxHttpLogMetadataDto;
}