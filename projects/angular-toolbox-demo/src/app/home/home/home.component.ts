import { Component } from '@angular/core';
import { DemoListService } from '../../model/service/demo-list.service';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { RouterModule } from '@angular/router';
import { GitComponent } from '../../ui/component/git/git.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    GitComponent
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
