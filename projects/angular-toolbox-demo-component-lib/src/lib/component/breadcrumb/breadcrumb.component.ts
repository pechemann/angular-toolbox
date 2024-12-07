import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from '../../model/service';

@Component({
    selector: 'atx-breadcrumb',
    imports: [
        RouterModule
    ],
    templateUrl: './breadcrumb.component.html'
})
export class AngularToolboxBreadcrumbComponent {

  constructor(protected breadcrumb: BreadcrumbService) {}
}
