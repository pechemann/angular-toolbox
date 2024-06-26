import { Component } from '@angular/core';
import { DarkModeService } from 'angular-toolbox';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { DemoComponent } from '../../../ui/component/demo/demo.component';

@Component({
  selector: 'app-dark-mode-service-bootstrap',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './dark-mode-service-bootstrap.component.html'
})
export class DarkModeServiceBootstrapComponent {

  //--> Darkmode logic for this example is located in the AppComponent.
  constructor(public darkModeService: DarkModeService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Dark Mode Service"));
  }

  public title: string = "Dark Mode Service: Bootstrap Integration";
  public presentation: string = "The following sample application shows how to easily integrate Bootstrap with the <code>DarkModeService</code> service.";
  public srcCode: CodeWrapper = {
    html: [`<button (click)="darkModeService.toggleDarkMode()"> Toggle Dark Mode </button>`],
    typescript: [`export class DarkModeServiceBootstrapComponent {

  constructor(public darkModeService: DarkModeService,
              @Inject(DOCUMENT) doc: Document) {
    this.setDarkmodeState(darkModeService.darkModeEnabled(), doc);
    darkModeService.change.subscribe((isDarkMode: boolean)=> this.setDarkmodeState(isDarkMode, doc));
  }
  private setDarkmodeState(isDarkMode: boolean, doc: Document): void {
    doc.body.setAttribute("data-bs-theme", isDarkMode ? 'dark' : 'light');
  }
}`]
  };
}
