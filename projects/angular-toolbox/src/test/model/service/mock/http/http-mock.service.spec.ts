/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { HTTP_MOCKING_FRAMEWORK_CONFIG, HttpMockConfig, HttpMockingFrameworkConfig, HttpMockProductionPolicy, HttpMockService } from '../../../../../lib/model';
import { getEmptyMockConfig, EMPTY_MOCK_CONFIG_WITH_ID, INVALID_ORIGIN, VALID_ORIGIN, MOCK_CONFIG } from './http-mock.service.util';
import { HttpMockServiceError, Uuid } from 'projects/angular-toolbox/src/public-api';
import { HTTPMethodRef } from 'projects/angular-toolbox/src/lib/framework/mock/http/util/http-method-ref.enum';
import { DOCUMENT } from '@angular/common';
import { HttpMockingFrameworkConfigManager } from 'projects/angular-toolbox/src/lib/util/http-mocking-framework-config.manager';

describe('HttpMockService', () => {
  let service: HttpMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpMockService, deps: [DOCUMENT] }
      ]
    });
    service = TestBed.inject(HttpMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('getAppOrigin() should return the URL origin of the current app', () => {
    expect(service.getAppOrigin()).toEqual(window.location.origin);
  });
  
  it('addConfig() should return the same Uuid as specified in the HttpMockConfig object', () => {
    const id: Uuid = EMPTY_MOCK_CONFIG_WITH_ID.id as any;
    expect(service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID)).toEqual(id);
  });
  
  it('addConfig() should add an Uuid to the HttpMockConfig object when not specified', () => {
    const emptyMock: HttpMockConfig = getEmptyMockConfig();
    expect(emptyMock.id).toBeUndefined();
    const id: Uuid = service.addConfig(emptyMock);
    expect(id).toEqual(emptyMock.id as any);
  });
  
  it('addConfig() should throw an error when a HttpMockConfig object with the same ID has already been added', () => {
    const exptected: string = `A config object has already been registered with the id: ["${EMPTY_MOCK_CONFIG_WITH_ID.id?.toString()}"].`;
    service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID);
    expect(()=> service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID)).toThrow(new HttpMockServiceError(exptected));
  });
  
  it('addConfig() should throw an error when the global origin ends with a slash ("/") character', () => {
    const emptyMock: HttpMockConfig = getEmptyMockConfig();
    emptyMock.origin = INVALID_ORIGIN;
    const exptected: string = `Origin must not end with a / character: ["${INVALID_ORIGIN}"].`;
    expect(()=> service.addConfig(emptyMock)).toThrow(new SyntaxError(exptected));
  });

  it('hasRegisteredConfig() should return false when the specified uuid has not already been added', () => {
    const id: Uuid = Uuid.build();
    expect(service.hasRegisteredConfig(id)).toBeFalse();
  });
  
  it('hasRegisteredConfig() should return true when the specified uuid has already been added', () => {
    const id: Uuid = service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID);
    expect(service.hasRegisteredConfig(id)).toBeTrue();
  });
  
  it('removeConfig() should remove the config object with the specified ID', () => {
    const id: Uuid = service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID);
    service.removeConfig(id);
    // No error means that previous config has been removed
    expect(service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID)).toEqual(id);
  });
  
  it('clearConfigs() should remove all configs', () => {
    const emptyMock: HttpMockConfig = getEmptyMockConfig();
    const id: Uuid = service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID);
    service.addConfig(emptyMock);
    service.clearConfigs();
    // No error means that previous config has been removed
    expect(service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID)).toEqual(id);
  });

  it('hasRegisteredConfig() should return false when the specified uuid has been removed', () => {
    const id: Uuid = service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID);
    expect(service.hasRegisteredConfig(id)).toBeTrue();
    service.removeConfig(id);
    expect(service.hasRegisteredConfig(id)).toBeFalse();
  });
  
  it('hasRegisteredConfig() should return false when the clearConfigs() method has been invoked', () => {
    const id: Uuid = service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID);
    expect(service.hasRegisteredConfig(id)).toBeTrue();
    service.clearConfigs();
    expect(service.hasRegisteredConfig(id)).toBeFalse();
  });
  
  it('addConfig() should throw an error when the origin associated with an interceptor ends with a slash ("/") character', () => {
    const emptyMock: HttpMockConfig = getEmptyMockConfig();
    emptyMock.interceptors.push({
      origin: INVALID_ORIGIN,
      id: "test",
      endpoints: []
    });
    const exptected: string = `Origin must not end with a / character: ["${INVALID_ORIGIN}"].`;
    expect(()=> service.addConfig(emptyMock)).toThrow(new SyntaxError(exptected));
  });
  
  it('addConfig() should add the config the origin associated with an interceptor is valid', () => {
    const emptyMock: HttpMockConfig = getEmptyMockConfig();
    emptyMock.interceptors.push({
      origin: VALID_ORIGIN,
      id: "test",
      endpoints: []
    });
    const id: Uuid = service.addConfig(emptyMock)
    expect(service.hasRegisteredConfig(id)).toBeTrue();
  });
  
  it('getRouteConfig() should return undefined when no method is declared for the specified URL ', () => {
    const validUrl: URL = new URL(VALID_ORIGIN);
    const emptyMock: HttpMockConfig = getEmptyMockConfig();
    emptyMock.interceptors.push({
      origin: VALID_ORIGIN,
      id: "test",
      endpoints: []
    });
    service.addConfig(emptyMock);
    Object.values(HTTPMethodRef).forEach(method => {
      expect(service.getRouteConfig(validUrl, method)).toBeUndefined();
    });
  });
  
  it('getRouteConfig() should return a RouteMockConfig object when a method is declared for the specified URL ', () => {
    const testUrl: URL = new URL(VALID_ORIGIN + "/test/1");
    service.addConfig(MOCK_CONFIG);
    expect(service.getRouteConfig(testUrl, HTTPMethodRef.GET)).toBeTruthy();
    expect(service.getRouteConfig(testUrl, HTTPMethodRef.DELETE)).toBeTruthy();
    expect(service.getRouteConfig(testUrl, HTTPMethodRef.POST)).toBeUndefined()
  });
  
  it('getRouteConfig() should return parameters associated with the specified URL ', () => {
    // Parameters/routes complete test case is covered by the path-to-regexp test suite.
    // This test case focuses on HttpMockService route association capabilities.
    const testUrl1: URL = new URL(VALID_ORIGIN + "/test/1");
    const testUrl2: URL = new URL(VALID_ORIGIN + "/test/25");
    service.addConfig(MOCK_CONFIG);
    let result: any = service.getRouteConfig(testUrl1, HTTPMethodRef.GET);
    expect(result.parameters.id).toEqual("1");
    result = service.getRouteConfig(testUrl2, HTTPMethodRef.DELETE);
    expect(result.parameters.id).toEqual("25");
  });
  
  it('configMmanager should return and instance of the HttpMockingFrameworkConfigManager class', () => {
    expect(service.configMmanager).toBeInstanceOf(HttpMockingFrameworkConfigManager);
  });
});

describe('HttpMockService: config test', () => {

  // Since the HttpMockingFrameworkConfigManager is instanciated in the constructor,
  // we just need to cover its instance invokations by the service.
  let service: HttpMockService;

  beforeEach(() => {
    const config: HttpMockingFrameworkConfig = {
      disableVisualFlag: true,
      productionPolicy: HttpMockProductionPolicy.WARNING
    }
    TestBed.configureTestingModule({
      providers: [
        { provide: HTTP_MOCKING_FRAMEWORK_CONFIG, useValue: config },
        { provide: HttpMockService, deps: [DOCUMENT, HTTP_MOCKING_FRAMEWORK_CONFIG] }
      ]
    });
    service = TestBed.inject(HttpMockService);
  });

  it('configMmanager.disableVisualFlag should return the value provided by the config object', () => {
    expect(service.configMmanager.disableVisualFlag).toBeTrue();
  });
  
  it('configMmanager.productionPolicy should return the value provided by the config object', () => {
    expect(service.configMmanager.productionPolicy).toEqual(HttpMockProductionPolicy.WARNING);
  });
  
  it('addConfig() should invoke the checkPolicy() method of the config manager object', () => {
    const manager: HttpMockingFrameworkConfigManager = service.configMmanager;
    spyOn(manager, "checkPolicy");
    service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID);
    expect(manager.checkPolicy).toHaveBeenCalled();
  });
  
  it('ngOnDestroy() should invoke the checkPolicy() method of the config manager object', () => {
    const manager: HttpMockingFrameworkConfigManager = service.configMmanager;
    spyOn(manager, "checkPolicy");
    service.ngOnDestroy();
    expect(manager.checkPolicy).toHaveBeenCalled();
  });
  
  it('removeConfig() should invoke the checkPolicy() method of the config manager object', () => {
    const manager: HttpMockingFrameworkConfigManager = service.configMmanager;
    const id: Uuid = service.addConfig(EMPTY_MOCK_CONFIG_WITH_ID);
    spyOn(manager, "checkPolicy");
    service.removeConfig(id);
    expect(manager.checkPolicy).toHaveBeenCalled();
  });
  
  it('clearConfigs() should invoke the checkPolicy() method of the config manager object', () => {
    const manager: HttpMockingFrameworkConfigManager = service.configMmanager;
    spyOn(manager, "checkPolicy");
    service.clearConfigs();
    expect(manager.checkPolicy).toHaveBeenCalled();
  });

  it('clearConfigs() should invoke the checkPolicy() method of the config manager object', () => {
    const manager: HttpMockingFrameworkConfigManager = service.configMmanager;
    spyOn(manager, "checkPolicy");
    service.clearConfigs();
    expect(manager.checkPolicy).toHaveBeenCalled();
  });
  
  it('getRouteConfig() should invoke the checkPolicy() method of the config manager object with the specified rout path and HTTP method', () => {
    const manager: HttpMockingFrameworkConfigManager = service.configMmanager;
    const route: string = "/test/1";
    const testUrl: URL = new URL(VALID_ORIGIN + route);
    service.addConfig(MOCK_CONFIG);
    spyOn(manager, "checkPolicy");
    service.getRouteConfig(testUrl, HTTPMethodRef.DELETE);
    expect(manager.checkPolicy).toHaveBeenCalledWith(route, HTTPMethodRef.DELETE);
  });
});