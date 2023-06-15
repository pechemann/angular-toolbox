import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeViewportComponent } from './code-viewport/code-viewport.component';

@NgModule({
  declarations: [
    CodeViewportComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CodeViewportComponent
  ]
})
export class UiModule { }
