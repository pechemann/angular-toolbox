import { Component, OnDestroy } from '@angular/core';
import { DarkModeService } from 'angular-toolbox';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { DemoComponent } from '../../../ui/component/demo/demo.component';

@Component({
  selector: 'app-dark-mode-service',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './dark-mode-service.component.html'
})
export class DarkModeServiceComponent implements OnDestroy {

  constructor(public darkModeService: DarkModeService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Dark Mode Service"));
  }

  public title: string = "Dark Mode Service Demo";
  public presentation: string = "A lightweight service that provides <em>Dark Mode</em> implementation for your Angular application.";
  public srcCode: CodeWrapper = {
    html: [`<button (click)="darkModeService.toggleDarkMode()"> Toggle Dark Mode </button>`],
    css: [`.dark-mode {
    background: #333;
    color: #fff;
}`],
    typescript:[`export class DarkModeServiceComponent {
    constructor(public darkModeService: DarkModeService) {}
}`]
  };

  public ngOnDestroy(): void {
    this.darkModeService.disableDarkMode();
  }
}
