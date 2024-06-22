/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { DEFAULT_DELIMITER } from '../../../../../lib/framework/mock/http/path-to-regexp/constants';
import { Token } from '../../../../../lib/framework/mock/http/path-to-regexp/token';
import { TokenData } from '../../../../../lib/framework/mock/http/path-to-regexp/token-data';

describe('TokenData', () => {

  const delimiter: string = DEFAULT_DELIMITER;
  const tokenList: Token[] = ["token1", "token2"];

  let instance: TokenData;

  beforeEach(() => {
    instance = new TokenData(tokenList, delimiter);
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });

  it('should have a readonly "tokens" property as passed in the constructor', () => {
    expect(instance.tokens).toEqual(tokenList);
  });

  it('should have a readonly "delimiter" property as passed in the constructor', () => {
    expect(instance.delimiter).toEqual(delimiter);
  });
});

