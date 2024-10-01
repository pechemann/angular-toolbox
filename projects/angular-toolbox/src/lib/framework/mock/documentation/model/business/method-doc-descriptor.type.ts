/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockMethodDescriptor } from '../../../../../model';

/**
 * @private
 * Used internally to manage the display of HTTP method descriptor objects.
 */
export type MethodDocDescriptor = {

  /**
   * @private
   */
  method: string,

  /**
   * @private
   */
  descriptor: HttpMockMethodDescriptor | undefined
};
