import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeViewportComponent } from './code-viewport/code-viewport.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    CodeViewportComponent,
    DemoComponent
  ],
  imports: [
    CommonModule,
    ClipboardModule
  ],
  exports: [
    CodeViewportComponent,
    DemoComponent

  ]
})
export class UiModule { }
