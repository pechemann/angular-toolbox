/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from '@angular/core';
import { HttpMockInterceptor, HttpMockConfig, HttpMethodMock, HttpMockEndpoint } from '../../../business';
import { HTTPMethodRef } from '../../../../framework/mock/http/util/http-method-ref.enum';
import { tokenDataToRegexp } from '../../../../framework/mock/http/path-to-regexp/token-data-to-regexp';
import { RouteMockConfig } from '../../../../framework/mock/http/config/route-mock-config';
import { Key } from '../../../../framework/mock/http/path-to-regexp/model/key';
import { stringToTokenData } from '../../../../framework/mock/http/path-to-regexp/string-to-token-data';
import { DEFAULT_DELIMITER } from '../../../../framework/mock/http/path-to-regexp/constants';
import { Uuid } from '../../../../util';
import { TokenData } from '../../../../framework/mock/http/path-to-regexp/token-data';

export const HTTP_MOCK_SERVICE: string = "HttpMockService";

interface HttpMockEndpointStorage {
  methodMock: HttpMethodMock;
  regexp: RegExp;
  keys: Key[];
  configId: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpMockService {

  /**
   * @private
   * Make sure that class type is still accessible after TypeScript compilation.
   */
  public readonly type: string = HTTP_MOCK_SERVICE;

  private _configIdList: Uuid[] = [];

  private _configList: Map<string, Map<string, HttpMockEndpointStorage[]>> = new Map<string, Map<string, HttpMockEndpointStorage[]>>();

  private readonly APP_ORIGIN: string = window.location.origin;

  public addConfig(config: HttpMockConfig): void {
    const origin: string = config.origin || this.APP_ORIGIN;
    let id: Uuid | undefined = config.id;
    if (!id) {
      id = Uuid.build();
      config.id = id;
    } else {
      if (this.hasRegisteredConfig(id)) throw new Error() ;
    }
    this._configIdList.push(id);
    const uuid: string = id.toString();
    config.interceptors.forEach((interceptor: HttpMockInterceptor) => this.extractConfig(interceptor, origin, uuid) );
  }

  public getAppOrigin(): string {
    return this.APP_ORIGIN;
  }

  public removeConfig(id: Uuid): void {
    if (!this.hasRegisteredConfig(id)) return;
    const configId: string = id.toString();
    this._configList.forEach((value: Map<string, HttpMockEndpointStorage[]>, key: string) => {
      this.deleteConfigById(value, configId);
      if (value.size === 0) this._configList.delete(key);
    });
    this._configIdList.splice(this._configIdList.indexOf(id), 1);
  }

  public clearConfigs(): void {
    this._configList.clear();
    this._configIdList.length = 0;
  }

  public hasRegisteredConfig(uuid: Uuid): boolean {
    return this._configIdList.indexOf(uuid) !== -1;
  }

  public getRouteConfig(url: URL, method: string): RouteMockConfig | undefined {
    const urlConfigList: Map<string, HttpMockEndpointStorage[]> | undefined = this._configList.get(url.origin);
    const route: string = url.pathname;
    let result: RouteMockConfig | undefined = undefined;
    if (!urlConfigList) return result;
    const methodList: HttpMockEndpointStorage[] | undefined = urlConfigList.get(method);
    if (!methodList) return result;
    let len: number = methodList.length - 1;
    while (len >= 0 ) {
      const methodMap: HttpMockEndpointStorage = methodList[len];
      const regexp: RegExp = methodMap.regexp;
      if (regexp.test(route)) {
        result = {
          methodConfig: methodMap.methodMock,
          parameters: this.buildParameters(regexp, methodMap.keys, route)
        };
        break;
      }
      len--;
    }
    return result;
  }

  private buildParameters(regexp: RegExp, keys: Key[], route: string): any {
    const execResult: RegExpExecArray | null = regexp.exec(route);
    if (!execResult) return null;
    const params: any = {};
    let len: number = execResult.length - 1;
    let i: number = 1;
    for (; i <= len; ++i) {
      const key: Key = keys[i - 1];
      params[key.name] = execResult[i];
    }
    return params;
  }

  private extractConfig(interceptor: HttpMockInterceptor, globalOrigin: string | undefined, configId: string): void {
    const endpoints: HttpMockEndpoint[] = interceptor.endpoints;
    let origin: string | undefined = interceptor.origin;
    if (origin) this.checkOrigin(origin);
    else origin = globalOrigin;
    if (!origin) throw new SyntaxError(`Origin not found for endpoint: ["${interceptor.id}"]`);
    if (!this._configList.has(origin)) this._configList.set(origin, new Map<string, HttpMockEndpointStorage[]>());
    endpoints.forEach((endpoint: HttpMockEndpoint) => {
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.GET, configId);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.POST, configId);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.PUT, configId);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.DELETE, configId);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.HEAD, configId);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.OPTIONS, configId);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.PATCH, configId);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.CONNECT, configId);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.TRACE, configId);
    });
  }

  private extractEndpointConfig(origin: string, endpoint: HttpMockEndpoint, method: HTTPMethodRef, configId: string): void {
    const ep: any = endpoint;
    if (!ep[method as any]) return;
    const originConfig: Map<string, HttpMockEndpointStorage[]> = this._configList.get(origin) as any;
    const route: string = endpoint.route;
    const data: TokenData = stringToTokenData(route);
    const keys: Key[] = [];
    const regexp: RegExp = tokenDataToRegexp(data, keys, {});
    if (!originConfig.has(method)) originConfig.set(method, []);
    const methodConfig: HttpMockEndpointStorage[] = originConfig.get(method) as any;
    methodConfig.push({
      regexp: regexp,
      keys: keys,
      methodMock: ep[method],
      configId: configId
    });
  }

  private checkOrigin(origin: string): void {
    if (origin.endsWith(DEFAULT_DELIMITER)) throw new SyntaxError(`Origin must not end with a / characted: ["${origin}"]`);
  }
  
  private deleteConfigById(storageMap: Map<string, HttpMockEndpointStorage[]>, configId: string): void {
    storageMap.forEach((storage: HttpMockEndpointStorage[], key: string) => {
      const cleanedConfig: HttpMockEndpointStorage[] = this.cleanConfig(storage, configId);
      if (cleanedConfig.length) storageMap.set(key, cleanedConfig);
      else storageMap.delete(key);
    });
  }

  private cleanConfig(storage: HttpMockEndpointStorage[], configId: string): HttpMockEndpointStorage[] {
    return storage.filter((value: HttpMockEndpointStorage)=> value.configId !== configId);
  }
}
