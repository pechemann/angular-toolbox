/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxConsoleJson } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-console-json";
import { ConsoleBodyType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/console-body-type";
import { ConsoleTypeClass } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/console-type-class";
import { DataUtil } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/data.util";
import { DATA } from "../test-util/http-monitoring-test-util";

describe('DataUtil', () => {

    it('getBodyType() should return ConsoleBodyType.NULL when object is null', () => {
        expect(DataUtil.getBodyType(null)).toEqual(ConsoleBodyType.NULL);
    });

    it('getBodyType() should return ConsoleBodyType.NULL when object is undefined', () => {
        expect(DataUtil.getBodyType(undefined)).toEqual(ConsoleBodyType.NULL);
    });

    it('getBodyType() should return ConsoleBodyType.STRING when object is a string', () => {
        expect(DataUtil.getBodyType("foo")).toEqual(ConsoleBodyType.TEXT);
    });

    it('getBodyType() should return ConsoleBodyType.BLOB when object is a Blob instance', () => {
        const blob: Blob = new Blob();
        expect(DataUtil.getBodyType(blob)).toEqual(ConsoleBodyType.BLOB);
    });

    it('getBodyType() should return ConsoleBodyType.FORM_DATA when object is a FormData instance', () => {
        const fd: FormData = new FormData();
        expect(DataUtil.getBodyType(fd)).toEqual(ConsoleBodyType.FORM_DATA);
    });

    it('getBodyType() should return ConsoleBodyType.ARRAY_BUFFER when object is a FormData instance', () => {
        const ab: ArrayBuffer = new ArrayBuffer(8);
        expect(DataUtil.getBodyType(ab)).toEqual(ConsoleBodyType.ARRAY_BUFFER);
    });

    it('getBodyType() should return ConsoleBodyType.JSON when object is a javascript object', () => {
        const json: any = { foo: "bar" };
        expect(DataUtil.getBodyType(json)).toEqual(ConsoleBodyType.JSON);
    });

    it('getBodyType() should return ConsoleBodyType.INVALID when object is a number', () => {
        expect(DataUtil.getBodyType(20)).toEqual(ConsoleBodyType.INVALID);
    });

    it('parseJson() should return an AtxConsoleJson object', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(DATA);
        expect(result.hasOwnProperty("label")).toBeTrue();
        expect(result.hasOwnProperty("value")).toBeTrue();
        expect(result.hasOwnProperty("typeClass")).toBeTrue();
        expect(result.hasOwnProperty("children")).toBeTrue();
    });

    it('parseJson() should return an AtxConsoleJson object with label equal to undefined by default', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(DATA);
        expect(result.label).toBeUndefined();
    });

    it('parseJson() should return an AtxConsoleJson object with the specified label', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(DATA, "testLabel");
        expect(result.label).toEqual("testLabel");
    });

    it('parseJson() should return an AtxConsoleJson object with the typeClass property equal to ConsoleTypeClass.OBJECT when object is an object', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(DATA);
        expect(result.typeClass).toEqual(ConsoleTypeClass.OBJECT);
    });

    it('parseJson() should return an AtxConsoleJson object with the typeClass property equal to ConsoleTypeClass.STRING when object is a string', () => {
        const result: AtxConsoleJson = DataUtil.parseJson("foo");
        expect(result.typeClass).toEqual(ConsoleTypeClass.STRING);
    });

    it('parseJson() should return an AtxConsoleJson object with the typeClass property equal to ConsoleTypeClass.NUMBER when object is a number', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(10);
        expect(result.typeClass).toEqual(ConsoleTypeClass.NUMBER);
    });

    it('parseJson() should return an AtxConsoleJson object with the typeClass property equal to ConsoleTypeClass.BOOLEAN when object is a boolean', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(true);
        expect(result.typeClass).toEqual(ConsoleTypeClass.BOOLEAN);
    });

    it('parseJson() should return an AtxConsoleJson object with the typeClass property equal to ConsoleTypeClass.ARRAY when object is an array', () => {
        const result: AtxConsoleJson = DataUtil.parseJson([]);
        expect(result.typeClass).toEqual(ConsoleTypeClass.ARRAY);
    });

    it('parseJson() should return an AtxConsoleJson object with the typeClass property equal to ConsoleTypeClass.NULL when object is null', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(null);
        expect(result.typeClass).toEqual(ConsoleTypeClass.NULL);
    });

    it('parseJson() should return an AtxConsoleJson object with the value property as a string representation of the specified object', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(DATA);
        expect(result.value).toEqual(JSON.stringify(DATA));
    });

    it('parseJson() should return an AtxConsoleJson object with the value property as a string representation of the specified array', () => {
        const arr: any[] = [ DATA ];
        const result: AtxConsoleJson = DataUtil.parseJson(arr);
        expect(result.value).toEqual(JSON.stringify(arr));
    });

    it('parseJson() should return an AtxConsoleJson object with the value property as a "null" when the specified object is null', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(null);
        expect(result.value).toEqual("null");
    });

    it('parseJson() should return an AtxConsoleJson object with the value property as eqalt to the object when the specified object is a primitive', () => {
        expect(DataUtil.parseJson(true).value).toBeTrue();
        expect(DataUtil.parseJson(20).value).toEqual(20);
    });

    it('parseJson() should return an AtxConsoleJson object with the value property that not exeeds 50 characters', () => {
        const arr: any[] = [ { foo: "bar #1" }, { foo: "bar #2" }, { foo: "bar #3" }, { foo: "bar #4" } ];
        const result: AtxConsoleJson = DataUtil.parseJson(arr);
        expect(result.value.length).toEqual(50);
    });

    it('parseJson() should return an AtxConsoleJson object with the children property equal to null when the specified object is a primitive, or null', () => {
        expect(DataUtil.parseJson(true).children).toBeNull();
        expect(DataUtil.parseJson(20).children).toBeNull();
        expect(DataUtil.parseJson("foo").children).toBeNull();
        expect(DataUtil.parseJson(null).children).toBeNull();
    });

    it('parseJson() should return an AtxConsoleJson object with the correct number of children when the specified object is an Array', () => {
        const arr: any[] = [ { foo: "bar #1" }, { foo: "bar #2" }, { foo: "bar #3" }, { foo: "bar #4" } ];
        const result: AtxConsoleJson = DataUtil.parseJson(arr);
        const children: any = result.children;
        expect(children.length).toEqual(4);
    });

    it('parseJson() should return an AtxConsoleJson object with children when the specified object is an JSON', () => {
        const result: AtxConsoleJson = DataUtil.parseJson(DATA);
        const children: any = result.children;
        expect(children.length).toEqual(1);
    });
    
    it('parseJson() should return an AtxConsoleJson object with the correct number of children when the specified object is an Object', () => {
        const complexObj: any = {
            foo: "bar",
            bar: "foo"
        };
        const result: AtxConsoleJson = DataUtil.parseJson(complexObj);
        const children: any = result.children;
        expect(children.length).toEqual(2);
    });

    it('DataUtil.parseJson() should be invoked to parse the child of an Object with the tupple [value,key]', () => {
        const parseJson: any = DataUtil.parseJson;
        spyOn(DataUtil, "parseJson");
        parseJson(DATA);
        expect(DataUtil.parseJson).toHaveBeenCalledWith("bar", "foo");
    });

    it('DataUtil.parseJson() should be invoked to parse the child of an Array with the tupple [value,index]', () => {
        const parseJson: any = DataUtil.parseJson;
        const arr: any[] = [ DATA ];
        spyOn(DataUtil, "parseJson");
        parseJson(arr);
        expect(DataUtil.parseJson).toHaveBeenCalledWith(DATA, "0");
    });

    it('DataUtil.parseJson() should be invoked on each child when the specified object is an Object', () => {
        const parseJson: any = DataUtil.parseJson;
        const complexObj: any = {
            foo: "bar",
            bar: "foo"
        };
        spyOn(DataUtil, "parseJson");
        parseJson(complexObj);
        expect(DataUtil.parseJson).toHaveBeenCalledTimes(2);
    });
    
    it('DataUtil.parseJson() should be invoked on each child when the specified object is an Array', () => {
        const parseJson: any = DataUtil.parseJson;
        const arr: any[] = [ { foo: "bar #1" }, { foo: "bar #2" }, { foo: "bar #3" }, { foo: "bar #4" } ];
        spyOn(DataUtil, "parseJson");
        parseJson(arr);
        expect(DataUtil.parseJson).toHaveBeenCalledTimes(4);
    });
});
