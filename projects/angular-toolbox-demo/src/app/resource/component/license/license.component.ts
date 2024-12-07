import { Component } from '@angular/core';
import { AngularToolboxPageTitleComponent, BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
    selector: 'app-license',
    imports: [
        AngularToolboxPageTitleComponent
    ],
    templateUrl: './license.component.html'
})
export class LicenseComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources", "resources"))
              .addItem(breadcrumb.buildItem("License"));
  }
}
