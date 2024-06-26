/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { BUTTON_ROLE, LINK_ROLE } from '../../public-api';

describe('Aria Roles', () => {
  
  it('BUTTON_ROLE should be "button"', () => {
    expect(BUTTON_ROLE).toEqual('button');
  });
  
  it('LINK_ROLE should be "link"', () => {
    expect(LINK_ROLE).toEqual('link');
  });
});
