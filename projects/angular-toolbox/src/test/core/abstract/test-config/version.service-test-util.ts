/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */
;

import { VersionConfig } from '../../../../lib/model/business/version';
import { AbstractVersionManager } from '../../../../lib/core';
import { Inject, Injectable } from '@angular/core';

export const TEST_CONFIG: VersionConfig = {
  major: 1,
  minor: 2,
  patch: 1,
  buildTimestamp: NaN
}

@Injectable()
export class CustomVersionService extends AbstractVersionManager {
  constructor(@Inject(TEST_CONFIG) config: VersionConfig) {
    super(config);
  }
}
