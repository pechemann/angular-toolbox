import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
