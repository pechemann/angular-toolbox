/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Inject, Injectable } from '@angular/core';
import { VERSION_CONFIG, VersionConfig, VersionManager } from '../../business';
import { AbstractVersionManager } from '../../../core';

/**
 * A lightweight service that provides Semantic Versioning implementation for your Angular projects.
 */
@Injectable({
  providedIn: 'root'
})
export class VersionService extends AbstractVersionManager implements VersionManager {

  /**
   * Creates a new VersionService instance.
   * @param config the reference to the VersionConfig provider.
   */
  constructor(@Inject(VERSION_CONFIG) config: VersionConfig) {
    super(config);
  }
}
