import { NgModule } from '@angular/core';
import { DARK_MODE_CONFIG, VERSION_CONFIG } from './model';

/**
 * @private
 */
@NgModule({
    providers: [
        { provide: DARK_MODE_CONFIG, useValue: DARK_MODE_CONFIG },
        { provide: VERSION_CONFIG, useValue: { major: 0, minor: 1, patch: 4, buildTimestamp: 1718620817645 } }
    ]
})
export class AngularToolboxModule { }