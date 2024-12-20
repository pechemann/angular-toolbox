/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, ViewChild } from "@angular/core";
import { NavbarComponent } from "projects/angular-toolbox/src/public-api";

@Component({
    selector: 'navbar-test',
    imports: [ NavbarComponent ],
    templateUrl: './navbar-test.component.html'
  })
  export class NavbarTestComponent {

    @ViewChild("navbar", {static: true})
    public navbar!: NavbarComponent;
  }