import { Component } from '@angular/core';
import { AngularToolboxIconListComponent, AngularToolboxPageTitleComponent, BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { IconListService } from '../../../ui/model/service/icon-list-list.service';
import { AngularToolboxLogoComponent } from 'projects/angular-toolbox/src/public-api';

@Component({
  selector: 'app-demo-home',
  standalone: true,
  imports: [
    AngularToolboxIconListComponent,
    AngularToolboxPageTitleComponent,
    AngularToolboxLogoComponent
  ],
  templateUrl: './demo-home.component.html',
  styleUrl: './demo-home.component.scss'
})
export class DemoHomeComponent {

  constructor(public iconListService: IconListService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll().addItem(breadcrumb.buildItem("Demo"));
  }
}
