/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders, HttpStatusCode } from "@angular/common/http";
import { DataStorage } from "projects/angular-toolbox/src/lib/framework/mock/http/core/data-storage";
import { DataStorageBuilder } from "projects/angular-toolbox/src/lib/framework/mock/http/util/data-storage.builder";
import { EMPTY_STRING, HttpMockRequestMetadata, HttpResponseMock } from "projects/angular-toolbox/src/public-api";

const STATUS: number = HttpStatusCode.Accepted;
const STATUS_TEXT: string = 'Status text test';
const URL_STRING: string = '/test/url';
const DELAY: number = 1500;
const HEADERS: HttpHeaders = new HttpHeaders();
const BODY_OBJ: any = { data: 'Body test' };

const RESPONSE_MOCK: HttpResponseMock = {
  body: BODY_OBJ,
  headers: HEADERS,
  status: STATUS,
  statusText: STATUS_TEXT,
  url: URL_STRING,
  error: null,
  delay: DELAY
};

const REQUEST_METADATA: HttpMockRequestMetadata = {
  duration: 0,
  start: 0
};

describe('DataStorageBuilder', () => {
  
  it('should create a HttpResponseMock object', () => {
    const dataStorage: DataStorage = DataStorageBuilder.buildDataStorage(RESPONSE_MOCK, BODY_OBJ, REQUEST_METADATA);
    expect(dataStorage).toBeTruthy();
  });
  
  it('httpResponse should be the same value as passed to the httpResponse parameter', () => {
    const dataStorage: DataStorage = DataStorageBuilder.buildDataStorage(RESPONSE_MOCK, BODY_OBJ, REQUEST_METADATA);
    expect(dataStorage.httpResponse).toEqual(RESPONSE_MOCK);
  });
  
  it('loaded should be equal to 0', () => {
    const dataStorage: DataStorage = DataStorageBuilder.buildDataStorage(RESPONSE_MOCK, BODY_OBJ, REQUEST_METADATA);
    expect(dataStorage.loaded).toEqual(0);
  });
  
  it('total should not be equal to 0 when data parameter is not null', () => {
    const dataStorage: DataStorage = DataStorageBuilder.buildDataStorage(RESPONSE_MOCK, BODY_OBJ, REQUEST_METADATA);
    expect(dataStorage.total).not.toEqual(0);
  });

  it('total should be equal to 0 when data parameter is null', () => {
    const dataStorage: DataStorage = DataStorageBuilder.buildDataStorage(RESPONSE_MOCK, null, REQUEST_METADATA);
    expect(dataStorage.total).toEqual(0);
  });

  it('data should be the same value as passed to the data parameter', () => {
    const dataStorage: DataStorage = DataStorageBuilder.buildDataStorage(RESPONSE_MOCK, BODY_OBJ, REQUEST_METADATA);
    expect(dataStorage.data).toEqual(BODY_OBJ);
  });
  
  it('data should be null when the value passed to the data parameter is null', () => {
    const dataStorage: DataStorage = DataStorageBuilder.buildDataStorage(RESPONSE_MOCK, null, REQUEST_METADATA);
    expect(dataStorage.data).toBeNull();
  });
  
  it('stringifiedData should be the JSON representation of the value passed to the data parameter', () => {
    const dataStorage: DataStorage = DataStorageBuilder.buildDataStorage(RESPONSE_MOCK, BODY_OBJ, REQUEST_METADATA);
    const stringifiedData: string = JSON.stringify(BODY_OBJ);
    expect(dataStorage.stringifiedData).toEqual(stringifiedData);
  });
  
  it('stringifiedData should be an empty string (string) when the value passed to the data parameter is null', () => {
    const dataStorage: DataStorage = DataStorageBuilder.buildDataStorage(RESPONSE_MOCK, null, REQUEST_METADATA);
    expect(dataStorage.stringifiedData).toEqual(EMPTY_STRING);
  });
});
