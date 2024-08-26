/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleBodyType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/console-body-type";
import { BodySerializer } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/body-serializer";
import { FormDataSerializer } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/form-data-serializer";

describe('BodySerializer', () => {

    it('serialize() should return a string when object is a JSON', () => {
        const result: any = BodySerializer.serialize({ foo: "bar" }, ConsoleBodyType.JSON);
        expect(result).toEqual(jasmine.any(String));
    });

    it('serialize() should return a string when object is a text', () => {
        const result: any = BodySerializer.serialize("foo", ConsoleBodyType.TEXT);
        expect(result).toEqual(jasmine.any(String));
    });

    it('serialize() should return null when object is a blob', () => {
        const result: any = BodySerializer.serialize(new Blob(), ConsoleBodyType.BLOB);
        expect(result).toBeNull();
    });

    it('serialize() should return a string when object is a FormData object', () => {
        const result: any = BodySerializer.serialize(new FormData(), ConsoleBodyType.FORM_DATA);
        expect(result).toEqual(jasmine.any(String));
    });

    it('serialize() should return null when object is an array buffer', () => {
        const result: any = BodySerializer.serialize(new ArrayBuffer(8), ConsoleBodyType.ARRAY_BUFFER);
        expect(result).toBeNull();
    });

    it('serialize() should return null when object is a null', () => {
        const result: any = BodySerializer.serialize(null, ConsoleBodyType.NULL);
        expect(result).toBeNull();
    });

    it('serialize() should return null when object type is not supported', () => {
        const result: any = BodySerializer.serialize(20, ConsoleBodyType.INVALID);
        expect(result).toBeNull();
    });
    
    it('serialize() should invoke JSON.stringify() when object is a JSON', () => {
        spyOn(JSON, "stringify");
        BodySerializer.serialize({ foo: "bar" }, ConsoleBodyType.JSON);
        expect(JSON.stringify).toHaveBeenCalled();
    });

    it('serialize() should invoke JSON.stringify() when object is a FormData object', () => {
        spyOn(JSON, "stringify");
        const result: any = BodySerializer.serialize(new FormData(), ConsoleBodyType.FORM_DATA);
        expect(JSON.stringify).toHaveBeenCalled();
    });

    it('unserialize() should return a string when object is a text', () => {
        const result: any = BodySerializer.unserialize("foo", ConsoleBodyType.TEXT);
        expect(result).toEqual(jasmine.any(String));
    });

    it('unserialize() should return a string when object is a JSON', () => {
        const result: any = BodySerializer.unserialize('{ "foo": "bar" }', ConsoleBodyType.JSON);
        expect(result).toEqual(jasmine.any(Object));
    });
    
    it('unserialize() should return null when object is a blob', () => {
        const result: any = BodySerializer.unserialize(null, ConsoleBodyType.BLOB);
        expect(result).toBeNull();
    });

    it('unserialize() should return null when object is an array buffer', () => {
        const result: any = BodySerializer.unserialize(null, ConsoleBodyType.ARRAY_BUFFER);
        expect(result).toBeNull();
    });

    it('unserialize() should return a null when object type is not supported', () => {
        const result: any = BodySerializer.unserialize(20, ConsoleBodyType.INVALID);
        expect(result).toBeNull();
    });
    
    it('unserialize() should return null when object is a null', () => {
        const result: any = BodySerializer.unserialize(null, ConsoleBodyType.NULL);
        expect(result).toBeNull();
    });

    it('unserialize() should invoke the FormDataSerializer.unserialize() method when object is a FormData instance', () => {
        spyOn(FormDataSerializer, "unserialize");
        BodySerializer.unserialize("[foo,bar]", ConsoleBodyType.FORM_DATA);
        expect(FormDataSerializer.unserialize).toHaveBeenCalled();
    });

    it('unserialize() should invoke the JSON.parse() when object is a JSON', () => {
        spyOn(JSON, "parse");
        BodySerializer.unserialize('{ "foo": "bar" }', ConsoleBodyType.JSON);
        expect(JSON.parse).toHaveBeenCalled();
    });
});
