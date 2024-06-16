import { NgModule } from '@angular/core';
import { DARK_MODE_CONFIG } from './service/ui/dark-mode.service';
import { VERSION_CONFIG } from './service';

@NgModule({
    declarations: [],
    providers: [
        { provide: DARK_MODE_CONFIG, useValue: DARK_MODE_CONFIG },
        { provide: VERSION_CONFIG, useValue: { major: 0, minor: 1, patch: 2, buildTimeStamp: 1718550881334 } }
    ],
    exports: []
})
export class AngularToolboxModule { }