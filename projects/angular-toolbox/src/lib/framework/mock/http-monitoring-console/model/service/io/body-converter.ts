/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleBodyType } from "../../../util/console-body-type";
import { DataUtil } from "../../../util/data.util";
import { AtxBodyDto } from "../../business/io/atx-body-dto";
import { BodySerializer } from "./body-serializer";

export class BodyConverter {

    public static bodyToDto(body: any): AtxBodyDto {
        const bodyType: ConsoleBodyType = DataUtil.getBodyType(body);
        return {
            type: bodyType,
            data: BodySerializer.serialize(body, bodyType)
        };
    }

    public static dtoToBody(dto: AtxBodyDto): any {
        const data: any = dto.data;
        const bodyType: ConsoleBodyType = dto.type;
        return data;
    }
}
