import { Component } from '@angular/core';
import { DemoListService } from '../../model/service/demo-list.service';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { RouterModule } from '@angular/router';
import { GitSectionComponent } from '../../ui/component/git-section/git-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    GitSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public demoList: DemoListService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
