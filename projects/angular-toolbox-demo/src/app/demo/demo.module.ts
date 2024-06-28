/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { UiModule } from '../ui/ui.module';
import { ButtonRoleDirective } from 'angular-toolbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DemoRoutingModule,
    UiModule,
    ButtonRoleDirective
  ]
})
export class DemoModule { }
