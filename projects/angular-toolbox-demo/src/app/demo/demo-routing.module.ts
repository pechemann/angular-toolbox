import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dark-mode-service',
    loadComponent: () => import('./dark-mode-service/dark-mode-service.component').then(mod => mod.DarkModeServiceComponent)
  },
  {
    path: 'scroll-service',
    loadComponent: () => import('./scroll-service/scroll-service.component').then(mod => mod.ScrollServiceComponent)
  },
  {
    path: 'subscription-service',
    loadComponent: () => import('./subscription-service-demo/subscription-service-demo.component').then(mod => mod.SubscriptionServiceComponent)
  },
  {
    path: 'button-role-directive',
    loadComponent: () => import('./button-role-directive/button-role-directive.component').then(mod => mod.ButtonRoleDirectiveComponent)
  },
  {
    path: 'version-service',
    loadComponent: () => import('./version-service/version-service.component').then(mod => mod.VersionServiceComponent)
  },
  {
    path: 'dark-mode-service-bootstrap',
    loadComponent: () => import('./dark-mode-service-bootstrap/dark-mode-service-bootstrap.component').then(mod => mod.DarkModeServiceBootstrapComponent)
  },
  {
    path: 'http-mock-service',
    loadComponent: () => import('./http-mock-service/http-mock-service.component').then(mod => mod.HttpMockServiceComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
