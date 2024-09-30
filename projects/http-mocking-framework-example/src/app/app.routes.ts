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
  },
  {
    path: 'say-hello',
    loadComponent: () => import('./my-awsome-company/component/say-hello/say-hello.component').then(mod => mod.SayHelloComponent)
  },
  {
    path: 'proxy-antipattern',
    loadComponent: () => import('./proxy-antipattern/proxy-antipattern.component').then(mod => mod.ProxyAntipatternComponent)
  },
  {
    path: 'monitoring',
    loadComponent: () => import('./monitoring/component/monitoring.component').then(mod => mod.MonitoringComponent)
  },
  {
    path: 'resources-documentation',
    loadComponent: () => import('./resources-documentation/resources-documentation.component').then(mod => mod.ResourcesDocumentationComponent)
  }
];
