/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DefaultLogConnector, DEFAULT_LOG_CONNECTOR } from "projects/angular-toolbox/src/public-api";

describe('DEFAULT_LOG_CONNECTOR', () => {

    it('should be an instance of DefaultLogConnector', () => {
        expect(DEFAULT_LOG_CONNECTOR).toBeInstanceOf(DefaultLogConnector);
    });

    /** Obsolette since Angular 20.0.0
    it('should be immutable', () => {
        const invalidAssignation = () => (DEFAULT_LOG_CONNECTOR as any) = new DefaultLogConnector();
        expect(invalidAssignation).toThrow();
    });
    */
});
