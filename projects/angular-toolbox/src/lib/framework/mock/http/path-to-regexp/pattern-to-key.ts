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

import { ASTERISK, PLUS } from "./constants";
import { Encode } from "./encode";
import { Key } from "./key";

/**
 * @private
 * Transform the specified encoded pattern into a `Key` object.
 * 
 * @param encode The `Encode` object used to perform transformation.
 * @param delimiter The delimiter used to perform transformation.
 * @param name The name used for the resulting `Key` object.
 * @param pattern The pattern to transform.
 * @param inputPrefix The prefix used for the resulting `Key` object.
 * @param inputSuffix The suffix used for the resulting `Key` object.
 * @param modifier The delimiter used to perform transformation.
 * @returns A `Key` object.
 */
export const patternToKey: (encode: Encode, delimiter: string, name: string, pattern: string | undefined, inputPrefix: string, inputSuffix: string, modifier: string | undefined)=>Key =
                           (encode: Encode, delimiter: string, name: string, pattern: string | undefined = "", inputPrefix: string = "", inputSuffix: string = "", modifier: string | undefined = ""): Key => {
  const prefix: string = encode(inputPrefix);
  const suffix: string = encode(inputSuffix);
  const separator: string | undefined =
    modifier === ASTERISK || modifier === PLUS
      ? prefix + suffix || delimiter
      : undefined;
  return { name, prefix, suffix, pattern, modifier, separator };
}
