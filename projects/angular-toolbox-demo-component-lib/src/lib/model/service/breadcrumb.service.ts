/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from '@angular/core';
import { BreadcrumbItem } from '../business/breadcrumb-item';
import { ArrayList } from 'projects/angular-toolbox/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService extends ArrayList<BreadcrumbItem> {

  constructor() {
    super("BreadcrumbService");
  }

  public buildItem(label: string, path?: string): BreadcrumbItem {
    return { label: label, path: path};
  }
}
