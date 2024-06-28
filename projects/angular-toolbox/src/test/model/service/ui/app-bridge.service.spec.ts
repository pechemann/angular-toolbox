/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { TestBed } from '@angular/core/testing';
import { AppBrigeService } from '../../../../lib/model/service/ui/app-bridge.service';
import { DOCUMENT } from '@angular/common';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { BRIDGE_COMMAND, BRIDGE_COMMAND_NAME } from '../../../core/bridge/test-util/app-bridge-command-util';
import { AppBridgeError } from '../../../../lib/core/error/app-bridge-error';

describe('AppBrigeService', () => {

    const reservedKeywords: string[] = ["navigate", "goToAnchor", "declareCommand", "deleteCommand", "getCommand"];
    const buildError = (methodName: string) => {
        return new AppBridgeError("Command name cannot be the reference to a native command: " + methodName);
      };
      
    const segment: string[] = ["/segment"];
    const extras: NavigationExtras = {};
    
    let service: AppBrigeService;
    let document: any;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule
            ],
            providers: [Router]
        });
        service = TestBed.inject(AppBrigeService);
        document = TestBed.inject(DOCUMENT);
        router = TestBed.inject(Router);
    });

    it('should create an instance', () => {
        expect(service).toBeTruthy();
    });

    it('should create an appBridge object on the defaultView object', () => {
        expect(document.defaultView.appBridge).toBeTruthy();
    });

    it('getCommand() should return undefined wheth no command is defiend for the specified name', () => {
        expect(service.getCommand(BRIDGE_COMMAND_NAME)).toBeUndefined();
    });

    it('declareCommand() should add a new command accessible with the getCommand() method', () => {
        service.declareCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
        expect(service.getCommand(BRIDGE_COMMAND_NAME)).toEqual(BRIDGE_COMMAND);
    });

    it('deleteCommand() should return false when the command does not exist', () => {
        expect(service.deleteCommand(BRIDGE_COMMAND_NAME)).toBeFalse();
    });

    it('deleteCommand() should return true the command reference when it exists', () => {
        service.declareCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
        expect(service.deleteCommand(BRIDGE_COMMAND_NAME)).toBeTrue();
    });

    it('declareCommand() should throw an error when the command name is a reserver keyword', () => {
        reservedKeywords.forEach(keyword => {
            expect(()=> service.declareCommand(keyword, BRIDGE_COMMAND)).toThrow(buildError(keyword));
        });
    });

    it('deleteCommand() should throw an error when the command name is a reserver keyword', () => {
        reservedKeywords.forEach(keyword => {
            expect(()=> service.deleteCommand(keyword)).toThrow(buildError(keyword));
        });
    });

    /*it('navigate should invoke the angular router, in the app context, with the specified parameters', () => {
        spyOn(router, 'navigate');
        document.defaultView.appBridge.navigate(segment, extras);
        expect(router.navigate).toHaveBeenCalledWith(segment, extras);
    });*/
});
