/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from "@angular/core";
import { DropdownComponent } from "projects/angular-toolbox/src/public-api";

@Component({
    selector: "dropdown-test-component",
    standalone: true,
    imports: [DropdownComponent],
    template: `<atx-dropdown buttonClass="btn btn-primary">
    Button Label
    <div content>
        Content text...
    </div>
</atx-dropdown>`
})
export class DropdownTestComponent {}