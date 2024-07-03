import { Component } from '@angular/core';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';
import { AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
  selector: 'app-license',
  standalone: true,
  imports: [
    AngularToolboxPageTitleComponent
  ],
  templateUrl: './license.component.html',
  styleUrl: './license.component.scss'
})
export class LicenseComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources", "resources"))
              .addItem(breadcrumb.buildItem("License"));
  }
}
