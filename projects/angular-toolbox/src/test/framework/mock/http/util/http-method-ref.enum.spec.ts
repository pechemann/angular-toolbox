/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HTTPMethodRef } from "projects/angular-toolbox/src/lib/framework/mock/http/util/http-method-ref.enum";

describe('HTTPMethodRef', () => {
  
  it('HTTPMethodRef.CONNECT should be "connect"', () => {
    expect(HTTPMethodRef.CONNECT).toEqual("connect");
  });

  it('HTTPMethodRef.DELETE should be "delete"', () => {
    expect(HTTPMethodRef.DELETE).toEqual("delete");
  });

  it('HTTPMethodRef.GET should be "get"', () => {
    expect(HTTPMethodRef.GET).toEqual("get");
  });

  it('HTTPMethodRef.HEAD should be "head"', () => {
    expect(HTTPMethodRef.HEAD).toEqual("head");
  });

  it('HTTPMethodRef.OPTIONS should be "options"', () => {
    expect(HTTPMethodRef.OPTIONS).toEqual("options");
  });

  it('HTTPMethodRef.PATCH should be "patch"', () => {
    expect(HTTPMethodRef.PATCH).toEqual("patch");
  });
  
  it('HTTPMethodRef.POST should be "post"', () => {
    expect(HTTPMethodRef.POST).toEqual("post");
  });

  it('HTTPMethodRef.PUT should be "put"', () => {
    expect(HTTPMethodRef.PUT).toEqual("put");
  });

  it('HTTPMethodRef.TRACE should be "trace"', () => {
    expect(HTTPMethodRef.TRACE).toEqual("trace");
  });
});
