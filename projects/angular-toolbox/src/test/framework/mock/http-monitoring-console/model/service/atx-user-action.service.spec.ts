/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxConsoleActionType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-console-action-type";
import { AtxUserActionService } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-user-action.service";

describe('AtxUserActionService', () => {
    let service: AtxUserActionService;
    
    beforeEach(() => {
        service = new AtxUserActionService();
    });
    
    it('should create', () => {
        expect(service).toBeTruthy();
    });
    
    it('sendAction() should trigger the action event emitter', (done) => {
        const sub = service.action.subscribe(action => {
            expect(action).toBeTruthy();
            sub.unsubscribe();
            done();
        });
        service.sendAction(AtxConsoleActionType.CLEAR_LOGS);
    });
    
    it('sendAction() should set data to null by default', (done) => {
        const sub = service.action.subscribe(action => {
            expect(action.data).toBeNull();
            sub.unsubscribe();
            done();
        });
        service.sendAction(AtxConsoleActionType.CLEAR_LOGS);
    });
    
    it('sendAction() should set the correct event properties', (done) => {
        const data: any = { foo: "bar" };
        const sub = service.action.subscribe(action => {
            expect(action.data).toBe(data);
            expect(action.type).toEqual(AtxConsoleActionType.EXPORT_LOGS);
            sub.unsubscribe();
            done();
        });
        service.sendAction(AtxConsoleActionType.EXPORT_LOGS, data);
    });
});
