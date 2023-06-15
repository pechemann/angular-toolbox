import { Component } from '@angular/core';
import { DemoListService } from '../../model/service/demo-list.service';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public demoList: DemoListService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
