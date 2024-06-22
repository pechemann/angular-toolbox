import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SrcViewportComponent } from './component/src-viewport/src-viewport.component';
import { DemoComponent } from './component/demo/demo.component';
import { CodeViewportComponent } from './component/code-viewport/code-viewport.component';

@NgModule({
  declarations: [
    CodeViewportComponent,
    SrcViewportComponent,
    DemoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CodeViewportComponent,
    SrcViewportComponent,
    DemoComponent

  ]
})
export class UiModule { }
