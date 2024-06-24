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
import { ASTERISK, PLUS, QUESTION_MARK } from "./constants";
import { DecodeKeyToString } from "./decode-key-to-string";
import { Encode } from "./encode";
import { escapeRegexpString } from "./escape-to-regexp-string";
import { Key } from "./key";

/**
 * @private
 * Convert a token into a regexp string (re-used for path validation).
 */
export const toKeyRegexp: (stringify: Encode, delimiter: string)=> DecodeKeyToString = (stringify: Encode, delimiter: string): DecodeKeyToString => {
  const segmentPattern: string = `[^${escapeRegexpString(delimiter)}]+?`;

  return (key: Key): string => {
    const prefix: string = key.prefix ? stringify(key.prefix) : EMPTY_STRING;
    const suffix: string = key.suffix ? stringify(key.suffix) : EMPTY_STRING;
    const modifier = key.modifier || EMPTY_STRING;

    if (key.name) {
      const pattern: string = key.pattern || segmentPattern;
      if (key.modifier === PLUS || key.modifier === ASTERISK) {
        const mod: string = key.modifier === ASTERISK ? QUESTION_MARK : EMPTY_STRING;
        const split: string = key.separator ? stringify(key.separator) : EMPTY_STRING;
        return `(?:${prefix}((?:${pattern})(?:${split}(?:${pattern}))*)${suffix})${mod}`;
      }
      return `(?:${prefix}(${pattern})${suffix})${modifier}`;
    }

    return `(?:${prefix}${suffix})${modifier}`;
  };
}
