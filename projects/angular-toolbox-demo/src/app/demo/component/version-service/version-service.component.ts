import { Component } from '@angular/core';
import { VersionService } from 'angular-toolbox';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { DatePipe } from '@angular/common';
import { DemoComponent } from '../../../ui/component/demo/demo.component';

@Component({
  selector: 'app-version-service',
  standalone: true,
  imports: [
    DemoComponent,
    DatePipe
  ],
  templateUrl: './version-service.component.html'
})
export class VersionServiceComponent {

  constructor(public versionService: VersionService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Version Service"));
  }

  protected title: string = "Version Service Demo";
  protected presentation: string = "A lightweight service that provides Semantic Versionning implementation for your Angular projects.";
  protected srcCode: CodeWrapper = {
    html: [`<p>Current Angular Toolbox Version: {{ versionService.getVersion().toString() }}</p>
<p>Build Release Date: {{ versionService.getBuildTimestamp() | date }}</p>`],
    typescript: [`/////////////////////////
// Application Module
/////////////////////////

@NgModule({
  declarations: [],
  providers: [
    { provide: VERSION_CONFIG, useValue: { major: 0, minor: 1, patch: 0 } }
  ],
  exports: []
})
export class AppModule { }
`, `/////////////////////////
// Component class
/////////////////////////

export class VersionServiceComponent {
    constructor(public versionService: VersionService) {}
}`]
  };
}
