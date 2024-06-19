import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DarkModeServiceComponent } from './dark-mode-service/dark-mode-service.component';
import { ScrollServiceComponent } from './scroll-service/scroll-service.component';
import { SubscriptionServiceComponent } from './subscription-service-demo/subscription-service-demo.component';
import { ButtonRoleDirectiveComponent } from './button-role-directive/button-role-directive.component';
import { VersionServiceComponent } from './version-service/version-service.component';
import { DarkModeServiceBootstrapComponent } from './dark-mode-service-bootstrap/dark-mode-service-bootstrap.component';
import { HttpMockServiceComponent } from './http-mock-service/http-mock-service.component';

const routes: Routes = [
  { path: 'dark-mode-service', component: DarkModeServiceComponent },
  { path: 'scroll-service', component: ScrollServiceComponent },
  { path: 'subscription-service', component: SubscriptionServiceComponent },
  { path: 'button-role-directive', component: ButtonRoleDirectiveComponent },
  { path: 'version-directive', component: VersionServiceComponent },
  { path: 'dark-mode-service-bootstrap', component: DarkModeServiceBootstrapComponent },
  { path: 'http-mock-service', component: HttpMockServiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
