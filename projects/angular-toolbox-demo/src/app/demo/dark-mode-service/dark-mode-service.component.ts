import { Component } from '@angular/core';
import { DarkModeService } from 'angular-toolbox';
import { CodeWrapper } from '../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';

@Component({
  selector: 'app-dark-mode-service',
  templateUrl: './dark-mode-service.component.html',
  styleUrls: ['./dark-mode-service.component.scss']
})
export class DarkModeServiceComponent {

  constructor(public darkModeService: DarkModeService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Dark Mode Service", "demo/dark-mode-service"));
  }

  public srcCode: CodeWrapper = {
    html: `<button (click)="darkModeService.toggleDarkMode()"> Toggle Dark Mode </button>`,
    css: `.dark-mode {
    background: #333;
    color: #fff;
}`,
    ts: `export class DarkModeServiceComponent {
    constructor(public darkModeService: DarkModeService) {}
}`
  };
}
