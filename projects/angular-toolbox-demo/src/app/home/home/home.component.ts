import { Component } from '@angular/core';
import { DemoListService } from '../../model/service/demo-list.service';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { RouterModule } from '@angular/router';
import { GitSectionComponent } from '../../ui/component/git-section/git-section.component';
import { IconListComponent } from '../../ui/component/icon-list/icon-list.component';
import { IconListItem } from '../../ui/model/business/icon-list-item';

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

  protected guideList: IconListItem[] = [
    { label: "Angular Toolbox Resources",  urlTree: ['/resources'] },
    { label: "Angular Toolbox Quick Start Guide",  urlTree: ['/resources', 'documentation', 'quick-start-guide'] },
    { label: "Angular Toolbox Documentation",  urlTree: ['/resources', 'documentation'] },
    { label: "HTTP Mocking Framework",  urlTree: ['/resources', 'documentation', 'http-mocking-framework'] }
  ]

  constructor(public demoList: DemoListService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
