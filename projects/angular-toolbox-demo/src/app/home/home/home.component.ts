import { Component } from '@angular/core';
import { IconListService } from '../../model/service/icon-list-list.service';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { RouterModule } from '@angular/router';
import { GitSectionComponent } from '../../ui/component/git-section/git-section.component';
import { IconListComponent } from '../../ui/component/icon-list/icon-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    IconListComponent,
    GitSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public iconListService: IconListService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
