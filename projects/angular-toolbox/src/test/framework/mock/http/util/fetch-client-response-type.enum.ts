/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { FetchClientResponseType } from "projects/angular-toolbox/src/lib/framework/mock/http/util/fetch-client-response-type.enum";

describe('FetchClientResponseType', () => {
  
  it('FetchClientResponseType.ARRAY_BUFFER should be "arrayBuffer"', () => {
    expect(FetchClientResponseType.ARRAY_BUFFER).toEqual("arrayBuffer");
  });

  it('FetchClientResponseType.BLOB should be "blob"', () => {
    expect(FetchClientResponseType.BLOB).toEqual("blob");
  });

  it('FetchClientResponseType.FORM_DATA should be "formData"', () => {
    expect(FetchClientResponseType.FORM_DATA).toEqual("formData");
  });

  it('FetchClientResponseType.JSON should be "json"', () => {
    expect(FetchClientResponseType.JSON).toEqual("json");
  });

  it('FetchClientResponseType.TEXT should be "text"', () => {
    expect(FetchClientResponseType.TEXT).toEqual("text");
  });

  it('FetchClientResponseType.RESPONSE should be "response"', () => {
    expect(FetchClientResponseType.RESPONSE).toEqual("response");
  });
});
