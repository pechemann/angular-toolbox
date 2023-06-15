import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipe/safe/safe-html.pipe';

@NgModule({
    declarations: [
        SafeHtmlPipe
    ],
    exports: [
        SafeHtmlPipe
    ]
})
export class AngularToolboxModule { }