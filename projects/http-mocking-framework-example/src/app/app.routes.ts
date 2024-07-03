/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Routes } from '@angular/router';

export const routes: Routes = [ {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'todo',
    loadComponent: () => import('./todo/component/todo/todo.component').then(mod => mod.TodoComponent)
  }
];
