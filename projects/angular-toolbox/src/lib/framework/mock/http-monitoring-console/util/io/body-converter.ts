/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleBodyType } from "../console-body-type";
import { DataUtil } from "../data.util";
import { AtxBodyDto } from "../../model/business/io/atx-body-dto";
import { BodySerializer } from "./body-serializer";

/**
 * @private
 * A utility class that performs conversions between JavaScript objects and `AtxBodyDto` objects.
 */
export class BodyConverter {

    /**
     * @private
     * Turns a JavaScript object into an `AtxBodyDto` object and returns the result of the conversion.
     * 
     * @param body The JavaScript object to convert.
     * @returns An `AtxBodyDto` object.
     */
    public static bodyToDto(body: any): AtxBodyDto {
        const bodyType: ConsoleBodyType = DataUtil.getBodyType(body);
        return {
            type: bodyType,
            data: BodySerializer.serialize(body, bodyType)
        };
    }

    /**
     * @private
     * Turns an `AtxBodyDto` object into a JavaScript object and returns the result of the conversion.
     * 
     * @param dto The `AtxBodyDto` object to convert.
     * @returns A JavaScript object.
     */
    public static dtoToBody(dto: AtxBodyDto): any {
        return BodySerializer.unserialize(dto.data, dto.type);
    }
}
