/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./component/resources/resources.component').then(mod => mod.ResourcesComponent)
  },
  {
    path: "license",
    loadComponent: () => import('./component/license/license.component').then(mod => mod.LicenseComponent)
  },
  {
    path: "documentation",
    loadComponent: () => import('./component/documentation/documentation.component').then(mod => mod.DocumentationComponent)
  },
  {
    path: "documentation/:id",
    loadComponent: () => import('./component/documentation/documentation.component').then(mod => mod.DocumentationComponent)
  },
  {
    path: "documentation/:id/:page",
    loadComponent: () => import('./component/documentation/documentation.component').then(mod => mod.DocumentationComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
