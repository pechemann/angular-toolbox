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
