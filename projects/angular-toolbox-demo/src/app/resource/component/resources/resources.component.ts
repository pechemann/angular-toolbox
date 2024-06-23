import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { GitComponent } from '../../../ui/component/git/git.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    RouterModule,
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
