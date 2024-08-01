/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DOCUMENT } from '@angular/common';
import { HttpMockingFrameworkConfigManager } from '../../lib/util/http-mocking-framework-config.manager';
import { TestBed } from '@angular/core/testing';
import { HttpMockingFrameworkConfig, HttpMockProductionPolicy } from '../../public-api';
import { HTTPMethodRef } from '../../lib/framework/mock/http/util/http-method-ref.enum';

const POLICY_WARNING: string = "HTTP Mocking Framework is running in production mode";

describe('HttpMockingFrameworkConfigManager', () => {
  
    let document: Document;
    let instance: HttpMockingFrameworkConfigManager;

    beforeEach(() => {
        document = TestBed.inject(DOCUMENT);
    });
    
    afterEach(() => {
        if (instance) instance.destroy();
    });

    it('should create an instance in development mode', () => {
        instance = new HttpMockingFrameworkConfigManager(document, true);
        expect(instance).toBeTruthy();
    });

    it('should create a visual flag when no config is provided', () => {
        instance = new HttpMockingFrameworkConfigManager(document, true);
        const flag = document.getElementById("http-mocking-framework-flag");
        expect(flag).toBeTruthy();
    });
      
    it('disableVisualFlag should be false when no config is provided', () => {
        instance = new HttpMockingFrameworkConfigManager(document, true);
        expect(instance.disableVisualFlag).toBeFalse();
    });
      
    it('productionPolicy should be HttpMockProductionPolicy.ERROR when no config is provided', () => {
        instance = new HttpMockingFrameworkConfigManager(document, true);
        expect(instance.productionPolicy).toEqual(HttpMockProductionPolicy.ERROR);
    });

    it('constructor should throw an error in production mode when no config is provided', () => {
        const build = () => new HttpMockingFrameworkConfigManager(document, false);
        expect(build).toThrow();
    });

    it('destroy should remove the visual flag in development mode when no config is provided', () => {
        instance = new HttpMockingFrameworkConfigManager(document, true);
        instance.destroy();
        const flag = document.getElementById("http-mocking-framework-flag");
        expect(flag).toBeFalsy();
    });

    it('should create a visual flag when config is provided and disableVisualFlag is false', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: false
        };
        instance = new HttpMockingFrameworkConfigManager(document, true, config);
        const flag = document.getElementById("http-mocking-framework-flag");
        expect(flag).toBeTruthy();
    });

    it('should not create a visual flag when config is provided and disableVisualFlag is true', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true
        };
        instance = new HttpMockingFrameworkConfigManager(document, true, config);
        const flag = document.getElementById("http-mocking-framework-flag");
        expect(flag).toBeFalsy();
    });

    it('destroy should remove the visual flag when disableVisualFlag is true', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: false
        };
        instance = new HttpMockingFrameworkConfigManager(document, true, config);
        instance.destroy();
        const flag = document.getElementById("http-mocking-framework-flag");
        expect(flag).toBeFalsy();
    });

    it('disableVisualFlag should return false the config disableVisualFlag property is false', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: false
        };
        instance = new HttpMockingFrameworkConfigManager(document, true, config);
        expect(instance.disableVisualFlag).toBeFalse();
    });

    it('disableVisualFlag should return true the config disableVisualFlag property is true', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true
        };
        instance = new HttpMockingFrameworkConfigManager(document, true, config);
        expect(instance.disableVisualFlag).toBeTrue();
    });
    
    it('productionPolicy should return provided by the config object', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true,
            productionPolicy: HttpMockProductionPolicy.SILENT
        };
        instance = new HttpMockingFrameworkConfigManager(document, true, config);
        expect(instance.productionPolicy).toEqual(HttpMockProductionPolicy.SILENT);
    });
    
    it('constructor should not throw any error in production mode when productionPolicy is equal to HttpMockProductionPolicy.SILENT', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true,
            productionPolicy: HttpMockProductionPolicy.SILENT
        };
        instance = new HttpMockingFrameworkConfigManager(document, false, config);
        expect(instance).toBeTruthy();
    });
    
    it('constructor should send a warning message to the console in production mode when productionPolicy is equal to HttpMockProductionPolicy.WARNING', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true,
            productionPolicy: HttpMockProductionPolicy.WARNING
        };
        spyOn(console, 'warn');
        instance = new HttpMockingFrameworkConfigManager(document, false, config);
        expect(console.warn).toHaveBeenCalledWith(POLICY_WARNING + ".");
    });
    
    it('checkPolicy() should do nothing in development mode with no config provider', () => {
        instance = new HttpMockingFrameworkConfigManager(document, true);
        expect(instance.checkPolicy()).toBeUndefined();
    });
    
    it('checkPolicy() should do nothing in development mode with a config provider and productionPolicy equal to HttpMockProductionPolicy.WARNING', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true,
            productionPolicy: HttpMockProductionPolicy.WARNING
        };
        instance = new HttpMockingFrameworkConfigManager(document, true, config);
        spyOn(console, 'warn');
        expect(instance.checkPolicy()).toBeUndefined();
        expect(console.warn).not.toHaveBeenCalled();
    });
    
    it('checkPolicy() should do nothing in development mode with a config provider and productionPolicy equal to HttpMockProductionPolicy.ERROR', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true,
            productionPolicy: HttpMockProductionPolicy.ERROR
        };
        instance = new HttpMockingFrameworkConfigManager(document, true, config);
        expect(instance.checkPolicy()).toBeUndefined();
    });
    
    it('checkPolicy() should do nothing in production mode with a config provider and productionPolicy equal to HttpMockProductionPolicy.SILENT', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true,
            productionPolicy: HttpMockProductionPolicy.SILENT
        };
        spyOn(console, 'warn');
        instance = new HttpMockingFrameworkConfigManager(document, false, config);
        expect(instance.checkPolicy()).toBeUndefined();
        expect(console.warn).not.toHaveBeenCalled();
    });
    
    it('checkPolicy() send a warning message to the console in production with a config provider and productionPolicy equal to HttpMockProductionPolicy.WARNING', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true,
            productionPolicy: HttpMockProductionPolicy.WARNING
        };
        spyOn(console, 'warn');
        instance = new HttpMockingFrameworkConfigManager(document, false, config);
        instance.checkPolicy();
        expect(console.warn).toHaveBeenCalledWith(POLICY_WARNING + ".");
    });
    
    it('checkPolicy() send a warning message to the console with the correct route and method', () => {
        const config: HttpMockingFrameworkConfig = {
            disableVisualFlag: true,
            productionPolicy: HttpMockProductionPolicy.WARNING
        };
        const route: string = "/path/to/route";
        const method: HTTPMethodRef = HTTPMethodRef.CONNECT;
        const expected: string = `${POLICY_WARNING}: intercepted request=[path=${route}, method=${method?.toUpperCase()}]`;
        spyOn(console, 'warn');
        instance = new HttpMockingFrameworkConfigManager(document, false, config);
        instance.checkPolicy(route, method);
        expect(console.warn).toHaveBeenCalledWith(POLICY_WARNING + ".");
        expect(console.warn).toHaveBeenCalledWith(expected);
    });
});
