import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { DarkModeServiceComponent } from './dark-mode-service/dark-mode-service.component';
import { UiModule } from '../ui/ui.module';
import { ScrollServiceComponent } from './scroll-service/scroll-service.component';
import { SubscriptionServiceComponent } from './subscription-service-demo/subscription-service-demo.component';
import { ButtonRoleDirectiveComponent } from './button-role-directive/button-role-directive.component';
import { ButtonRoleDirective } from 'angular-toolbox';
import { VersionServiceComponent } from './version-service/version-service.component';
import { DarkModeServiceBootstrapComponent } from './dark-mode-service-bootstrap/dark-mode-service-bootstrap.component';
import { HttpMockServiceComponent } from './http-mock-service/http-mock-service.component';

@NgModule({
  declarations: [
    DarkModeServiceComponent,
    ScrollServiceComponent,
    SubscriptionServiceComponent,
    ButtonRoleDirectiveComponent,
    VersionServiceComponent,
    DarkModeServiceBootstrapComponent,
    HttpMockServiceComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    UiModule,
    ButtonRoleDirective
  ]
})
export class DemoModule { }
