/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxDefaultLogConnector, DEFAULT_LOG_CONNECTOR } from "projects/angular-toolbox/src/public-api";

describe('DEFAULT_LOG_CONNECTOR', () => {

    it('should be an instance of AtxDefaultLogConnector', () => {
        expect(DEFAULT_LOG_CONNECTOR).toBeInstanceOf(AtxDefaultLogConnector);
    });

    it('should be immutable', () => {
        const invalidAssignation = () => (DEFAULT_LOG_CONNECTOR as any) = new AtxDefaultLogConnector();
        expect(invalidAssignation).toThrow();
    });
});
