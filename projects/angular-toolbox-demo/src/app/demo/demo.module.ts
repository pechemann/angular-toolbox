import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { DarkModeServiceComponent } from './dark-mode-service/dark-mode-service.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [
    DarkModeServiceComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    UiModule
  ]
})
export class DemoModule { }
