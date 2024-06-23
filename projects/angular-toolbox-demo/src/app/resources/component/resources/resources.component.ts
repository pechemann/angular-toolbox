import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { GitComponent } from '../../../ui/component/git/git.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    GitComponent
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources"));
  }
}
