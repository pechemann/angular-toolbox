import { Component } from '@angular/core';
import { BreadcrumbService } from '../ui/model/service/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(public breadcrumb: BreadcrumbService) {}
}
