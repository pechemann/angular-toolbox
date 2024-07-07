/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getInvalidComponentOnDestroy, getInvalidComponentOnInit, InvalidComponentMockService, FooComponent, UUID } from "../test-utils/http-mock-test-utils";
import { HttpMockService, Uuid } from "projects/angular-toolbox/src/public-api";

describe('HttpMock', () => {

    let component: FooComponent;
    let service: HttpMockService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                HttpMockService
            ]
        }).compileComponents()
        service = TestBed.inject(HttpMockService)
        component = new FooComponent(service);
    });

    it('mock config should be added to the service only after the ngOnInit() method invokation', () => {
        const uuid: Uuid = UUID;
        expect(service.hasRegisteredConfig(uuid)).toBeFalse();
        component.ngOnInit();
        expect(service.hasRegisteredConfig(uuid)).toBeTrue();
    });
    
    it('mock config should be removed from the service only after the ngOnDestroy() method invokation', () => {
        const uuid: Uuid = UUID;
        component.ngOnInit();
        expect(service.hasRegisteredConfig(uuid)).toBeTrue();
        component.ngOnDestroy();
        expect(service.hasRegisteredConfig(uuid)).toBeFalse();
    });
});

describe('HttpMock: invalid components', () => {

    it('should throw an error when there is not provider for the HttpMockService service.', async () => {
        await TestBed.configureTestingModule({
            declarations: [
                InvalidComponentMockService
            ]
        }).compileComponents();
        const fixture: ComponentFixture<InvalidComponentMockService> = TestBed.createComponent(InvalidComponentMockService);
        expect(()=> fixture.detectChanges()).toThrow(new ReferenceError("No provider found for HttpMockService."));
    });
    
    it('should throw an error when the component does not implement the OnDestroy interface', async () => {
        expect(getInvalidComponentOnDestroy).toThrow(new ReferenceError("Component must implement the OnDestroy interface."));
    });

    it('should throw an error when the component does not implement the OnInit interface', async () => {
        expect(getInvalidComponentOnInit).toThrow(new ReferenceError("Component must implement the OnInit interface."));
    });
});