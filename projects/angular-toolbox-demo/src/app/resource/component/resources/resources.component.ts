import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { RouterModule } from '@angular/router';
import { GitSectionComponent } from '../../../ui/component/git-section/git-section.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    RouterModule,
    GitSectionComponent
  ],
  templateUrl: './resources.component.html'
})
export class ResourcesComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources"));
  }
}
