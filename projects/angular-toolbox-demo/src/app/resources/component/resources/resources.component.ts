import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  providers: [],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources"));
  }
}
