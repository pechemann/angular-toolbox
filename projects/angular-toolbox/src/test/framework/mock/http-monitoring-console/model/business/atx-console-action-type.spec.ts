/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxConsoleActionType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-console-action-type";

describe('AtxConsoleActionType', () => {

    it('AtxConsoleActionType.CLEAR_LOGS should equal 0', () => {
        expect(AtxConsoleActionType.CLEAR_LOGS).toEqual(0);
    });

    it('AtxConsoleActionType.EXPORT_LOGS should equal 1', () => {
        expect(AtxConsoleActionType.EXPORT_LOGS).toEqual(1);
    });

    it('AtxConsoleActionType.IMPORT_LOGS should equal 2', () => {
        expect(AtxConsoleActionType.IMPORT_LOGS).toEqual(2);
    });

    it('AtxConsoleActionType.LOG_SELECT should equal 3', () => {
        expect(AtxConsoleActionType.LOG_SELECT).toEqual(3);
    });

    it('AtxConsoleActionType.CLOSE_DETAILS_PANEL should equal 4', () => {
        expect(AtxConsoleActionType.CLOSE_DETAILS_PANEL).toEqual(4);
    });
});
