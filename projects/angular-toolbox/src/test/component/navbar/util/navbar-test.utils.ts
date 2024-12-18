/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

export const buildMediaQueryList = (matches: boolean = true): MediaQueryList => {
  return {
    matches: matches,
    media: "",
    addEventListener: {} as any,
    dispatchEvent: {} as any,
    onchange: {} as any,
    removeEventListener: {} as any,
    addListener: {} as any,
    removeListener: {} as any
  };
};