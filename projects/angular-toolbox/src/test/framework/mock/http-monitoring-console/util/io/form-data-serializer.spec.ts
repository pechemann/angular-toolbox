/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


import { FormDataSerializer } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/form-data-serializer";

describe('FormDataSerializer', () => {

    it('unserialize() should throw an error if the serialized object is not a JSON object', () => {
        const action: any = () => FormDataSerializer.unserialize("foo");
        expect(action).toThrowError();
    });

    it('unserialize() should return null if the serialized object is not an array', () => {
        const obj: string = '{ "foo": "bar" }';
        const result: any = FormDataSerializer.unserialize(obj);
        expect(result).toBeNull();
    });
    
    it('unserialize() should throw an error if the serialized object is not a FormData object', () => {
        const obj: string = '["foo", "bar ]"';
        const action: any = () => FormDataSerializer.unserialize(obj);
        expect(action).toThrowError();
    });
    
    it('unserialize() should return a valid FormData object', () => {
        const obj: string = '[["foo", "bar"],["key", "10"]]';
        const result: any = FormDataSerializer.unserialize(obj);
        expect(result).toBeInstanceOf(FormData);
    });
    
    it('unserialize() should return a FormData object with the specified fields', () => {
        const obj: string = '[["foo", "bar"],["key", "10"]]';
        const result: FormData = FormDataSerializer.unserialize(obj) as any;
        expect(result.get("foo")).toEqual("bar");
        expect(result.get("key") as any).toEqual('10');
    });
});
