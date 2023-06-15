import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeViewportComponent } from './code-viewport/code-viewport.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    CodeViewportComponent
  ],
  imports: [
    CommonModule,
    ClipboardModule
  ],
  exports: [
    CodeViewportComponent
  ]
})
export class UiModule { }
