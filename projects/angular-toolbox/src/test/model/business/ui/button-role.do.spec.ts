/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BUTTON_ROLE_DATA_OBJECT, BUTTON_ROLE_EVENT, ATX_DATA } from "../../../directive/test-utils/button-role-directive-test.util";

describe('ButtonRoleDataObject interface: check interface API as validated by TypeScript', () => {

  it('event property should exist on ButtonRoleDataObject instances', () => {
    expect(BUTTON_ROLE_DATA_OBJECT.event).toEqual(BUTTON_ROLE_EVENT);
  });

  it('data property should exist on ButtonRoleDataObject instances', () => {
    expect(BUTTON_ROLE_DATA_OBJECT.data).toEqual(ATX_DATA);
  });
});
