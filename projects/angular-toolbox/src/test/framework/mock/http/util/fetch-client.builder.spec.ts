/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EMPTY_STRING, FetchClientResponseType, FetchClientBuilder } from 'projects/angular-toolbox/src/public-api';
import { Observable, Subscription } from "rxjs";

const ERROR_RESPONSE = new Response(JSON.stringify({}), { status: 404, statusText: 'Not Found' });
let mockIndex: number = 0;

const buildMockData = ()=> {
  const uid: string = crypto.randomUUID();
  return { id: uid, data: "mock response #" + ++mockIndex};
}
const buildOkResponse = (data: any)=> {
  return new Response(JSON.stringify(data), { status: 200, statusText: 'OK' });
}

describe('FetchClientBuilder', () => {
  
  it('should return a FetchClient object', (done) => {
    const obj = FetchClientBuilder.buildFetchClient(EMPTY_STRING);
    expect(obj).toBeInstanceOf(Observable);
    done();
  });

  it('should try to access the specified resource without options', (done) => {
    spyOn(window, 'fetch').and.resolveTo(buildOkResponse(buildMockData()));
    FetchClientBuilder.buildFetchClient('/foo/bar/1');
    expect(window.fetch).toHaveBeenCalledWith('/foo/bar/1', undefined);
    done();
  });
  
  it('should try to access the specified resource with options', (done) => {
    const options: RequestInit = {
      method: "POST",
      referrerPolicy: "no-referrer"
    };
    spyOn(window, 'fetch').and.resolveTo(buildOkResponse(buildMockData()));
    FetchClientBuilder.buildFetchClient('/foo/bar/2', options);
    expect(window.fetch).toHaveBeenCalledWith('/foo/bar/2', options);
    done();
  });
  
  it('HTTP error should throw an exception catched by Angular', (done) => {
    spyOn(window, 'fetch').and.resolveTo(ERROR_RESPONSE);
    const sub: Subscription = FetchClientBuilder.buildFetchClient('/foo/bar/3').subscribe({
      error: err =>{
        expect(err.status).toEqual(ERROR_RESPONSE.status);
        expect(err.statusText).toEqual(ERROR_RESPONSE.statusText);
        sub.unsubscribe();
        done();
      }
    })
  });
  
  it('default response type should return valid json data as expected', (done) => {
    const data = buildMockData();
    spyOn(window, 'fetch').and.resolveTo(buildOkResponse(data));
    const sub: Subscription = FetchClientBuilder.buildFetchClient('/foo/bar/4').subscribe({
      next: value => {
        expect(value.data).toEqual(data.data);
        expect(value.id).toEqual(data.id);
        sub.unsubscribe();
        done();
      }
    })
  });
  
  it('FetchClientResponseType.JSON response type should return valid json data as expected', (done) => {
    const data = buildMockData();
    spyOn(window, 'fetch').and.resolveTo(buildOkResponse(data));
    const sub: Subscription = FetchClientBuilder.buildFetchClient(
      '/foo/bar/5',
      null,
      FetchClientResponseType.JSON
    ).subscribe({
      next: value => {
        expect(value.data).toEqual(data.data);
        expect(value.id).toEqual(data.id);
        sub.unsubscribe();
        done();
      }
    })
  });

  it('FetchClientResponseType.TEXT response type should return string data as expected', (done) => {
    const response: Response = new Response("test", { status: 200, statusText: 'OK' });
    spyOn(window, 'fetch').and.resolveTo(response);
    const sub: Subscription = FetchClientBuilder.buildFetchClient(
      '/foo/bar/6',
      null,
      FetchClientResponseType.TEXT
    ).subscribe({
      next: value => {
        expect(value).toEqual("test");
        sub.unsubscribe();
        done();
      }
    })
  });
  
  it('FetchClientResponseType.BLOB response type should return blob data as expected', (done) => {
    const response: Response = new Response("test", { status: 200, statusText: 'OK' });
    spyOn(window, 'fetch').and.resolveTo(response);
    const sub: Subscription = FetchClientBuilder.buildFetchClient(
      '/foo/bar/7',
      null,
      FetchClientResponseType.BLOB
    ).subscribe({
      next: value => {
        expect(value).toBeInstanceOf(Blob);
        expect(value.type).toEqual("text/plain;charset=utf-8");
        sub.unsubscribe();
        done();
      }
    })
  });
  
  it('FetchClientResponseType.FORM_DATA response type should return FormData object as expected', (done) => {
    const formData = new FormData();
    formData.append("username", "Chris");
    const response: Response = new Response(formData, { status: 200, statusText: 'OK' });
    spyOn(window, 'fetch').and.resolveTo(response);
    const sub: Subscription = FetchClientBuilder.buildFetchClient(
      '/foo/bar/8',
      null,
      FetchClientResponseType.FORM_DATA
    ).subscribe({
      next: value => {
        expect(value.get("username")).toEqual("Chris");
        sub.unsubscribe();
        done();
      }
    })
  });
  
  it('FetchClientResponseType.ARRAY_BUFFER response type should return ArrayBuffer object as expected', (done) => {
    const data = buildMockData();
    spyOn(window, 'fetch').and.resolveTo(buildOkResponse(data));
    const sub: Subscription = FetchClientBuilder.buildFetchClient(
      '/foo/bar/9',
      null,
      FetchClientResponseType.ARRAY_BUFFER
    ).subscribe({
      next: value => {
        expect(value).toBeInstanceOf(ArrayBuffer);
        const parsedJson = JSON.parse(new TextDecoder().decode(value as ArrayBuffer));
        expect(parsedJson.data).toEqual(data.data);
        expect(parsedJson.id).toEqual(data.id);
        sub.unsubscribe();
        done();
      }
    })
  });
  
  it('FetchClientResponseType.RESPONSE response type should return the response object as expected', (done) => {
    const response = buildOkResponse(null);
    spyOn(window, 'fetch').and.resolveTo(response);
    const sub: Subscription = FetchClientBuilder.buildFetchClient(
      '/foo/bar/9',
      null,
      FetchClientResponseType.RESPONSE
    ).subscribe({
      next: value => {
        expect(value).toBeInstanceOf(Response);
        expect(value.status).toEqual(response.status);
        expect(value.statusText).toEqual(response.statusText);
        sub.unsubscribe();
        done();
      }
    })
  });
});
