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
    path: '',
    loadComponent: () => import('./component/demo-home/demo-home.component').then(mod => mod.DemoHomeComponent)
  },
  {
    path: 'dark-mode-service',
    loadComponent: () => import('./component/dark-mode-service/dark-mode-service.component').then(mod => mod.DarkModeServiceComponent)
  },
  {
    path: 'scroll-service',
    loadComponent: () => import('./component/scroll-service/scroll-service.component').then(mod => mod.ScrollServiceComponent)
  },
  {
    path: 'subscription-service',
    loadComponent: () => import('./component/subscription-service-demo/subscription-service-demo.component').then(mod => mod.SubscriptionServiceComponent)
  },
  {
    path: 'button-role-directive',
    loadComponent: () => import('./component/button-role-directive/button-role-directive.component').then(mod => mod.ButtonRoleDirectiveComponent)
  },
  {
    path: 'version-service',
    loadComponent: () => import('./component/version-service/version-service.component').then(mod => mod.VersionServiceComponent)
  },
  {
    path: 'dark-mode-service-bootstrap',
    loadComponent: () => import('./component/dark-mode-service-bootstrap/dark-mode-service-bootstrap.component').then(mod => mod.DarkModeServiceBootstrapComponent)
  },
  {
    path: 'http-mock-service',
    loadComponent: () => import('./component/http-mock-service/http-mock-service.component').then(mod => mod.HttpMockServiceComponent)
  },
  {
    path: 'http-mock-error',
    loadComponent: () => import('./component/http-mock-error/http-mock-error.component').then(mod => mod.HttpMockErrorComponent)
  },
  {
    path: 'array-list',
    loadComponent: () => import('./component/array-list/array-list.component').then(mod => mod.ArrayListComponent)
  },
  {
    path: 'logging-framework',
    loadComponent: () => import('./component/logging-framework/logging-framework.component').then(mod => mod.LoggingFrameworkComponent)
  },
  {
    path: 'window-service',
    loadComponent: () => import('./component/window-service/window-service.component').then(mod => mod.WindowServiceComponent)
  },
  {
    path: 'border-layout',
    loadComponent: () => import('./component/border-layout/border-layout-demo.component').then(mod => mod.BorderLayoutDemoComponent)
  },
  {
    path: 'dropdown',
    loadComponent: () => import('./component/dropdown/dropdown-demo.component').then(mod => mod.DropdownDemoComponent)
  },
  {
    path: 'dialog',
    loadComponent: () => import('./component/dialog/dialog-demo.component').then(mod => mod.DialogDemoComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
