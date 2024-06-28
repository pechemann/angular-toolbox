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
import { Router, RouterModule, Routes } from '@angular/router';
import { addAnchor, BRIDGE_COMMAND, BRIDGE_COMMAND_NAME, getAnchorName, getButton, MockEvent } from '../../../core/bridge/test-util/app-bridge-test-utils';
import { AppBridgeError } from '../../../../lib/core/error/app-bridge-error';

//TODO: test NavigationExtras of the navigate() method
describe('AppBrigeService', () => {
    
    const validSegment: string = "segment";
    const reservedKeywords: string[] = ["navigate", "goToAnchor", "declareCommand", "deleteCommand", "getCommand"];
    const buildError = (methodName: string) => {
        return new AppBridgeError("Command name cannot be the reference to a native command: " + methodName);
    };
    
    let service: AppBrigeService;
    let testDocument: any;
    let router: Router;
    const routes: Routes = [
        { path: validSegment, loadComponent: () => import('../../../core/bridge/test-util/app-bridge-test-utils').then(mod => mod.MockComponent) }
    ];

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [ RouterModule.forRoot(routes) ],
            providers: [
                { provide: DOCUMENT, useValue: document }
            ]
        }).compileComponents();
        testDocument = TestBed.inject(DOCUMENT);
        service = TestBed.inject(AppBrigeService);
        router = TestBed.inject(Router);
    });

    it('should create an instance', () => {
        expect(service).toBeTruthy();
    });

    it('should create an appBridge object on the defaultView object', () => {
        expect(testDocument.defaultView.appBridge).toBeTruthy();
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

    it('declareCommand() should throw an error when the command name is a reserved keyword', () => {
        reservedKeywords.forEach(keyword => {
            expect(()=> service.declareCommand(keyword, BRIDGE_COMMAND)).toThrow(buildError(keyword));
        });
    });

    it('deleteCommand() should throw an error when the command name is a reserved keyword', () => {
        reservedKeywords.forEach(keyword => {
            expect(()=> service.deleteCommand(keyword)).toThrow(buildError(keyword));
        });
    });
    
    it('navigate() should invoke the angular router and return false when navigation fails', async() => {
        await testDocument.defaultView.appBridge.navigate(["/test"]).then((result: boolean)=> expect(result).toBeFalse());
    });
    
    it('navigate() should invoke the angular router and return true when navigation succeeds', async() => {
        await service.navigate([validSegment]).then((result: boolean)=> expect(result).toBeTrue());
    });

    it('goToAnchor() should throw an error when no "href" attribute is specified on the decorated element', () => {
        const link = getButton(null);
        const event: MockEvent = new MockEvent(link);
        const expected = new ReferenceError("href attribute is not defined.");
        expect(()=> service.goToAnchor(event)).toThrow(expected);
    });

    it('goToAnchor() should silently fail when no id matches the "href" attribute', async() => {
        const anchorName: string = getAnchorName();
        const link = getButton("#" + anchorName);
        const event: MockEvent = new MockEvent(link);
        await service.goToAnchor(event).then((result: boolean)=> expect(result).toBeFalse());
    });

    it('goToAnchor() should scroll to the element with the id specified by the "href" attribute', () => {
        const anchorName: string = getAnchorName();
        const elm: HTMLElement = addAnchor(testDocument, anchorName);
        const link = getButton("#" + anchorName);
        const event: MockEvent = new MockEvent(link);
        spyOn(elm, "scrollIntoView");
        service.goToAnchor(event);
        expect(elm.scrollIntoView).toHaveBeenCalled();
    });
    
    it('goToAnchor() should invoke the angular router and return true when navigation succeeds', async() => {
        const anchorName: string = getAnchorName();
        const elm: HTMLElement = addAnchor(testDocument, anchorName);
        const link = getButton("#" + anchorName);
        const event: MockEvent = new MockEvent(link);
        await service.goToAnchor(event).then((result: boolean)=> expect(result).toBeTrue());
    });

    it('declareCommand() should add a new command accessible as a property of the service instance', () => {
        service.declareCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
        expect((service as any)[BRIDGE_COMMAND_NAME]).toEqual(BRIDGE_COMMAND);
    });

    it('declareCommand() should create a getter property only', () => {
        service.declareCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
        const setToNull = ()=> {
            (service as any)[BRIDGE_COMMAND_NAME] = null;
        };
        expect(setToNull).toThrowError("Cannot set property testCommand of [object Object] which has only a getter");
    });

    it('deleteCommand() should remove the command accessible as a property of the service instance', () => {
        service.declareCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
        service.deleteCommand(BRIDGE_COMMAND_NAME);
        expect((service as any)[BRIDGE_COMMAND_NAME]).toBeUndefined();
    });
});
