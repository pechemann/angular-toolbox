/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Uuid } from "projects/angular-toolbox/src/public-api";
import { AbstractWindowServiceImpl, WindowTestComponent } from "./abstract-window-service.test.util";

describe('AbstractWindowService', () => {

  let impl: AbstractWindowServiceImpl;

  beforeEach(()=> {
    impl = new AbstractWindowServiceImpl();
  });
  
  it('should create an instance', () => {
    expect(impl).toBeTruthy();
  });
  
  it('get() should return undefined when the reference does not exists', () => {
    expect(impl.get(Uuid.build())).toBeUndefined();
  });
  
  it('get() should return the registered references', () => {
    const id: Uuid = impl.open(WindowTestComponent);
    const ref = impl.get(id);
    expect(ref).toBeTruthy();
    expect(ref?.componentRef.instance).toBeInstanceOf(WindowTestComponent);
  });
  
  it('getAll() should return an empty array by default', () => {
    expect(impl.getAll().length).toEqual(0);
  });
  
  it('getAll() should return an array that contains the registered references', () => {
    impl.open(WindowTestComponent);
    const all = impl.getAll();
    expect(all.length).toEqual(1);
    expect(all[0].componentRef.instance).toBeInstanceOf(WindowTestComponent);
  });
  
  it('destroy() should remove all the registered references', () => {
    impl.open(WindowTestComponent);
    expect(impl.getAll().length).toEqual(1);
    impl.destroy();
    expect(impl.getAll().length).toEqual(0);
  });
});
