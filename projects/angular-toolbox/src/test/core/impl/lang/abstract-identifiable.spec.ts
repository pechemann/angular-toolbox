/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { IdentifiableComponent } from '../../../../lib/core/impl';
import { Identifiable, Uuid } from '../../../../public-api';

class IdentifiableImpl extends IdentifiableComponent {
  constructor() {
    super();
  }
}

describe('IdentifiableComponent', () => {

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
