/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxBodyDto } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/io/atx-body-dto";
import { DataUtil } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/data.util";
import { BodyConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/body-converter";
import { BodySerializer } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/body-serializer";

describe('BodyConverter', () => {

    const json: any = { foo: "bar" };

    it('bodyToDto() should return an AtxBodyDto object', () => {
        const result: AtxBodyDto = BodyConverter.bodyToDto(json);
        expect(result.hasOwnProperty("type")).toBeTrue();
        expect(result.hasOwnProperty("data")).toBeTrue();
    });

    it('bodyToDto() should invoke DataUtil.getBodyType() method to get the body type', () => {
        spyOn(DataUtil, "getBodyType");
        BodyConverter.bodyToDto(json);
        expect(DataUtil.getBodyType).toHaveBeenCalledWith(json);
    });

    it('bodyToDto() should invoke BodySerializer.serialize() method to serialize the body', () => {
        spyOn(BodySerializer, "serialize");
        const result: AtxBodyDto = BodyConverter.bodyToDto(json);
        expect(BodySerializer.serialize).toHaveBeenCalledWith(json, result.type);
    });

    it('dtoToBody() should invoke BodySerializer.unserialize() method to unserialize the dto', () => {
        spyOn(BodySerializer, "unserialize");
        const dto: AtxBodyDto = BodyConverter.bodyToDto(json);
        BodyConverter.dtoToBody(dto);
        expect(BodySerializer.unserialize).toHaveBeenCalledWith(dto.data, dto.type);
    });
});