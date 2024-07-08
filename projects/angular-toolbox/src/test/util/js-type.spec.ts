/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { UNDEFINED, OBJECT, BOOLEAN, NUMBER, BIGINT, FUNCTION, STRING, SYMBOL } from '../../public-api';

describe('JavaScript Types', () => {
  
  it('UNDEFINED should be "undefined"', () => {
    expect(UNDEFINED).toEqual('undefined');
  });
  
  it('OBJECT should be "object"', () => {
    expect(OBJECT).toEqual('object');
  });

  it('BOOLEAN should be "boolean"', () => {
    expect(BOOLEAN).toEqual('boolean');
  });

  it('NUMBER should be "number"', () => {
    expect(NUMBER).toEqual('number');
  });
  
  it('BIGINT should be "bigint"', () => {
    expect(BIGINT).toEqual('bigint');
  });
  
  it('FUNCTION should be "function"', () => {
    expect(FUNCTION).toEqual('function');
  });
  
  it('STRING should be "string"', () => {
    expect(STRING).toEqual('string');
  });
  
  it('SYMBOL should be "symbol"', () => {
    expect(SYMBOL).toEqual('symbol');
  });
});
