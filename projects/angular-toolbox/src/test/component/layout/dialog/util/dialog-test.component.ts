/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { DialogService } from 'projects/angular-toolbox/src/lib/component/dialog';

@Component({
  selector: 'app-dialog-test',
  standalone: true,
  template: '<div>Dialog Test Component</div>'
})
export class DialogTestComponent {

  constructor(protected dialog: DialogService) {}
}
