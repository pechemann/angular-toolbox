import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { DarkModeServiceComponent } from './dark-mode-service/dark-mode-service.component';
import { UiModule } from '../ui/ui.module';
import { ScrollServiceComponent } from './scroll-service/scroll-service.component';

@NgModule({
  declarations: [
    DarkModeServiceComponent,
    ScrollServiceComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    UiModule
  ]
})
export class DemoModule { }
