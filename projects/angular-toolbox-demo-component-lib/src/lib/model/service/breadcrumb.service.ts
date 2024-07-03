/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from '@angular/core';
import { BreadcrumbItem } from '../business/breadcrumb-item';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private readonly _itemList: BreadcrumbItem[] = [];

  public addItem(item: BreadcrumbItem): BreadcrumbService {
    this._itemList.push(item);
    return this;
  }

  public buildItem(label: string, path?: string): BreadcrumbItem {
    return { label: label, path: path};
  }

  public removeAll(): BreadcrumbService {
    this._itemList.length = 0;
    return this;
  }

  public getItemList(): BreadcrumbItem [] {
    return this._itemList;
  }
}
