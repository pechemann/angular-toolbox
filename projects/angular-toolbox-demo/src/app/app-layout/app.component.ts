import { Component } from '@angular/core';
import { BreadcrumbService } from '../ui/model/service/breadcrumb.service';
import { DarkModeService } from 'angular-toolbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public breadcrumb: BreadcrumbService, darkMode: DarkModeService) {}
}
