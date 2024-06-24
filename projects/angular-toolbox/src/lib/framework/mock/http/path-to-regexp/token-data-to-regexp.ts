/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 *
 * This source code is derived from the following original source code:
 * - https://github.com/pillarjs/path-to-regexp
 * - Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)
 * 
 * Use of the original source code is governed by an MIT-style license 
 * that can be found in the LICENSE file at
 * https://github.com/pillarjs/path-to-regexp/blob/master/LICENSE
 */

import { EMPTY_STRING } from "../../../../util";
import { CARRET, DEFAULT_DELIMITER, DOLLAR } from "./constants";
import { Encode } from "./encode";
import { escapeRegexpString } from "./escape-to-regexp-string";
import { Key } from "./key";
import { getFlags } from "./get-flags";
import { PathToRegexpOptions } from "./path-to-regexp-options";
import { TokenData } from "./token-data";
import { DecodeKeyToString } from "./decode-key-to-string";
import { toKeyRegexp } from "./to-key-regexp";
import { toStringify } from "./to-stringify";
import { TokenDataRegExpFactory } from "./token-data-regexp-factory";

/**
 * @Private
 * Expose a function for taking tokens and returning a RegExp.
 */
export const tokenDataToRegexp: TokenDataRegExpFactory = (data: TokenData, keys: Key[], options: PathToRegexpOptions): RegExp => {
  const {
    trailing = true,
    start = true,
    end = true,
    loose = true,
  } = options;
  const stringify: Encode = toStringify(loose, data.delimiter);
  const keyToRegexp: DecodeKeyToString = toKeyRegexp(stringify, data.delimiter);
  let pattern: string = start ? CARRET : EMPTY_STRING;
  
  for (const token of data.tokens) {
    if (typeof token === "string") {
      pattern += stringify(token);
    } else {
      if (token.name) keys.push(token);
      pattern += keyToRegexp(token);
    }
  }

  if (trailing) pattern += `(?:${stringify(data.delimiter)})?`;
  pattern += end ? DOLLAR : `(?=${escapeRegexpString(data.delimiter)}|$)`;

  // URLs in general are case-sensitive (with the exception of machine names).
  // See https://www.w3.org/TR/WD-html40-970708/htmlweb.html
  // Note that default modifier is "i".
  return new RegExp(pattern, getFlags(options));
}
