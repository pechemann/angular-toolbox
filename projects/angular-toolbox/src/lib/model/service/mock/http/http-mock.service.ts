/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Injectable } from '@angular/core';
import { HttpMockInterceptor, HttpMockConfig, HttpMethodMock, HttpMockEndpoint } from '../../../business';
import { HTTPMethodRef } from '../../../../framework/mock/http/util/http-method-ref.enum';
import { tokenDataToRegexp } from '../../../../framework/mock/http/path-to-regexp/token-data-to-regexp';
import { RouteMockConfig } from '../../../../framework/mock/http/config/route-mock-config';
import { Key } from '../../../../framework/mock/http/path-to-regexp/key';
import { TokenData } from '../../../../framework/mock/http/path-to-regexp/token-data';
import { stringToTokenData } from '../../../../framework/mock/http/path-to-regexp/string-to-token-data';
import { DEFAULT_DELIMITER } from '../../../../framework/mock/http/path-to-regexp/constants';

interface HttpMockEndpointStorage {
  methodMock: HttpMethodMock;
  regexp: RegExp;
  keys: Key[];
}

@Injectable({
  providedIn: 'root'
})
export class HttpMockService {

  private _configList: Map<string, Map<string, HttpMockEndpointStorage[]>> = new Map<string, Map<string, HttpMockEndpointStorage[]>>();

  public setConfig(config: HttpMockConfig): void {
    const origin: string | undefined = config.origin;
    config.interceptors.forEach((interceptor: HttpMockInterceptor) => this.extractConfig(interceptor, origin) );
  }

  public clearConfig(): void {
    this._configList.clear();
  }

  public getRouteConfig(url: URL, method: string): RouteMockConfig | undefined {
    const urlConfigList: Map<string, HttpMockEndpointStorage[]> | undefined = this._configList.get(url.origin);
    const route: string = url.pathname;
    let result: RouteMockConfig | undefined = undefined;
    if (!urlConfigList) return result;
    const methodList: HttpMockEndpointStorage[] | undefined = urlConfigList.get(method);
    if (!methodList) return result;
    const len: number = methodList.length - 1;
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
      params[key.name] = execResult[len];
    }
    return params;
  }

  private extractConfig(interceptor: HttpMockInterceptor, globalOrigin: string | undefined): void {
    const endpoints: HttpMockEndpoint[] = interceptor.endpoints;
    let origin: string | undefined = interceptor.origin;
    if (origin) this.checkOrigin(origin);
    else origin = globalOrigin;
    if (!origin) throw new SyntaxError(`Origin not found for endpoint: ["${interceptor.id}"]`);
    if (!this._configList.has(origin)) this._configList.set(origin, new Map<string, HttpMockEndpointStorage[]>());
    endpoints.forEach((endpoint: HttpMockEndpoint) => {
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.GET);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.POST);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.PUT);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.DELETE);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.HEAD);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.OPTIONS);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.PATCH);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.CONNECT);
      this.extractEndpointConfig(origin, endpoint, HTTPMethodRef.TRACE);
    });
  }

  private extractEndpointConfig(origin: string, endpoint: HttpMockEndpoint, method: HTTPMethodRef): void {
    const ep: any = endpoint;
    if (!ep[method as any]) return;
    const originConfig: Map<string, HttpMockEndpointStorage[]> = this._configList.get(origin) as any;
    const route: string = endpoint.route;
    // TODO: possibly use options parameter:
    const data: TokenData = stringToTokenData(route);
    const keys: Key[] = [];
    const regexp: RegExp = tokenDataToRegexp(data, keys, {});
    if (!originConfig.has(method)) originConfig.set(method, []);
    const methodConfig: HttpMockEndpointStorage[] = originConfig.get(method) as any;
    methodConfig.push({
      regexp: regexp,
      keys: keys,
      methodMock: ep[method]
    });
  }

  private checkOrigin(origin: string): void {
    if (origin.endsWith(DEFAULT_DELIMITER)) throw new SyntaxError(`Origin must not end with a / characted: ["${origin}"]`);
  }
}
