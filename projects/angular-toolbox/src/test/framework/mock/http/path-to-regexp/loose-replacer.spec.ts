/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { PLUS } from "../../../../../lib/framework/mock/http/path-to-regexp/constants";
import { looseReplacer } from "../../../../../lib/framework/mock/http/path-to-regexp/loose-replacer";

describe('looseReplacer', () => {
  
  it('should return the escaped string passed in the "value" parameter', () => {
      expect(looseReplacer("/test")).toEqual("\\/test");
  });

  it('should return an escaped string with a plus (+) modifier suffix', () => {
    expect(looseReplacer("/test", "add")).toEqual(`\\/test${PLUS}`);
});
});
