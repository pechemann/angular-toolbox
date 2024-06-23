/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

export const NON_CAPTURING_PATTERN_STRING: string = "/:foo(?:\\d+(\\.\\d+)?)";
export const NON_CAPTURING_PATTERN_ERROR: TypeError = new TypeError('Pattern cannot start with "?" at 6');

export const NESTED_CAPTURING_GROUP_STRING: string = "/:foo(\\d+(\\.\\d+)?)";
export const NESTED_CAPTURING_GROUP_ERROR: TypeError = new TypeError('Capturing groups are not allowed at 9');

export const UNBALANCED_PATTERN_STRING: string = "/:foo(abc";
export const UNBALANCED_PATTERN_ERROR: TypeError = new TypeError('Unbalanced pattern at 5');

export const MISSING_PATTERN_STRING: string = "/:foo()";
export const MISSING_PATTERN_ERROR: TypeError = new TypeError('Missing pattern at 5');

export const MISSING_NAME_STRING: string = "/:(test)";
export const MISSING_NAME_ERROR: TypeError = new TypeError('Missing parameter name at 2');

export const NESTED_GROUPS_STRING: string = "/{a{b:foo}}";
export const NESTED_GROUPS_ERROR: TypeError = new TypeError("Unexpected { at 3, expected }");
