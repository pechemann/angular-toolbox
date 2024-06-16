import { NgModule } from '@angular/core';
import { DARK_MODE_CONFIG } from './service/ui/dark-mode.service';

@NgModule({
    declarations: [],
    providers: [
        { provide: DARK_MODE_CONFIG, useValue: DARK_MODE_CONFIG }
    ],
    exports: []
})
export class AngularToolboxModule { }