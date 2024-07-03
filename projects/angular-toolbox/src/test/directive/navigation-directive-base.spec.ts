/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { NavigationDirectiveBase } from "../../lib/directive/navigation-directive-base";
import { BUTTON_ROLE } from "../../public-api";
import { MockElementRef } from "./test-utils/mock-element-ref";

describe('NavigationDirectiveBase', () => {

    let directiveBase: NavigationDirectiveBase;
    let elmRef: MockElementRef;

    beforeEach(() => {
        elmRef = new MockElementRef();
        directiveBase = new NavigationDirectiveBase(elmRef, BUTTON_ROLE);
    });

    it('should create an instance', () => {
        expect(directiveBase).toBeTruthy();
    });
    
    it('should set the role property of the ElementRef object with the specified "role" parameter', () => {
        expect(elmRef.nativeElement.role).toEqual(BUTTON_ROLE);
    });
    
    it('should set the tabIndex property of the ElementRef object with 0', () => {
        expect(elmRef.nativeElement.tabIndex).toEqual(0);
    });
});
