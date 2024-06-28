/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./component/resources/resources.component').then(mod => mod.ResourcesComponent)
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
