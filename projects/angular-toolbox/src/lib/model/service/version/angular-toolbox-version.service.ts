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
const LAYERS_VERSION_CONFIG: VersionConfig = {
  major: 0,
  minor: 11,
  patch: 3,
  buildTimestamp: 1722599248501,
  metadata: "beta"
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
    super(LAYERS_VERSION_CONFIG);
  }
}
