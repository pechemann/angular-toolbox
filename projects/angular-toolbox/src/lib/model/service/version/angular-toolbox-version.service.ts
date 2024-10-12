/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from '@angular/core';
import { AbstractVersionManager } from '../../../core';
import { VersionConfig } from '../../business';

/**
 * @private
 * The current version of the Angular Toolbox library.
 */
const ATX_VERSION_CONFIG: VersionConfig = {
  major: 1,
  minor: 4,
  patch: 3,
  buildTimestamp: 1728711207638
};

/**
 * The public service that exposes the current version of the Angular Toolbox library.
 */
@Injectable()
export class AngularToolboxVersionService extends AbstractVersionManager {

  /**
   * @private
   */
  constructor() {
    super(ATX_VERSION_CONFIG);
  }
}
