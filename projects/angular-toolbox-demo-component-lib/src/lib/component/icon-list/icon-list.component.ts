/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconListItem } from '../../model/business/icon-list-item';

@Component({
    selector: 'atx-icon-list',
    imports: [
        RouterModule
    ],
    templateUrl: './icon-list.component.html',
    styleUrl: './icon-list.component.scss'
})
export class AngularToolboxIconListComponent {

  @Input()
  public itemList!: IconListItem[];
}
