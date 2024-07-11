/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { IdentifiableComponent } from '../../../../lib/core/impl';
import { Identifiable, Uuid } from '../../../../public-api';

const buildIdentifiableComponent = (classRef: string | undefined): Identifiable => {
  return new IdentifiableComponent(classRef);
}

describe('IdentifiableComponent', () => {

  let impl: Identifiable;

  it('should create an instance', () => {
    impl = buildIdentifiableComponent(undefined);
    expect(impl).toBeTruthy();
  });
  
  it('getID() should return a Uuid instance', () => {
    impl = buildIdentifiableComponent(undefined);
    expect(impl.getID()).toBeInstanceOf(Uuid);
  });
  
  it('getClassRef() should return the constructor name when the classRef parameter of the construtor function is "undefined"', () => {
    impl = buildIdentifiableComponent(undefined);
    expect(impl.getClassRef()).toEqual(impl.constructor.name);
  });
  
  it('getClassRef() should return the value of the classRef parameter of the construtor function when it is defined', () => {
    const classRef: string = "IdentifiableComponent";
    impl = buildIdentifiableComponent(classRef);
    expect(impl.getClassRef()).toEqual(classRef);
  });
});
