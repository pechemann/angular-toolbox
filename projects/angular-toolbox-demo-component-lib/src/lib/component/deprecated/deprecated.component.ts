import { Component, Input } from '@angular/core';
import { EMPTY_STRING } from 'projects/angular-toolbox/src/public-api';

@Component({
    selector: 'atx-deprecated',
    templateUrl: './deprecated.component.html'
})
export class AngularToolboxDeprecatedComponent {
    
    @Input()
    public since: string = EMPTY_STRING;
}
