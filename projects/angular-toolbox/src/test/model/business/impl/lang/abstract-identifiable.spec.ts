/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { AbstractIdentifiable, Identifiable, Uuid } from '../../../../../public-api';

class IdentifiableImpl extends AbstractIdentifiable {
  constructor() {
    super();
  }
}

describe('AbstractIdentifiable', () => {

  let impl: Identifiable;

  it('should create an instance', () => {
    impl = new IdentifiableImpl();
    expect(impl).toBeTruthy();
  });
  
  it('getID() should return a Uuid instance', () => {
    impl = new IdentifiableImpl();
    expect(impl.getID()).toBeInstanceOf(Uuid);
  });
});
