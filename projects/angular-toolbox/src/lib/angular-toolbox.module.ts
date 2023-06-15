import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipe/safe/safe-html.pipe';
import { DARK_MODE_CONFIG } from './service/ui/dark-mode.service';

@NgModule({
    declarations: [
        SafeHtmlPipe
    ],
    providers: [
        { provide: DARK_MODE_CONFIG, useValue: DARK_MODE_CONFIG }
      ],
    exports: [
        SafeHtmlPipe
    ]
})
export class AngularToolboxModule { }