/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from "@angular/core";

export const TEST_URL: string = "http://external-url.com";

@Component({
  template: `<div id="testElm" navigateToUrl href="http://external-url.com"><div>`
})
export class NavigateToUrlDirectiveTestComponent {}

@Component({
  template: `<div id="testElm" navigateToUrl><div>`
})
export class NavigateToUrlDirectiveNoHrefTestComponent {}
