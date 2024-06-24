import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DarkModeService, SubscriptionService } from 'angular-toolbox';
import { CodeWrapper } from '../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { DOCUMENT } from '@angular/common';
import { DemoComponent } from '../../ui/component/demo/demo.component';

@Component({
  selector: 'app-dark-mode-service-bootstrap',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './dark-mode-service-bootstrap.component.html'
})
export class DarkModeServiceBootstrapComponent implements OnInit, OnDestroy {

  constructor(public darkModeService: DarkModeService,
              private _subscription: SubscriptionService,
              @Inject(DOCUMENT) private _document: Document,
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
    this.darkModeService.change.subscribe(
        (isDarkMode: boolean)=> doc.body.setAttribute("data-bs-theme", isDarkMode ? 'dark' : 'light'))
    );
  }
}`]
  };

  public ngOnInit(): void {
    this._subscription.register(this,
      this.darkModeService.change.subscribe(
        (isDarkMode: boolean)=> this._document.body.setAttribute("data-bs-theme", isDarkMode ? 'dark' : 'light'))
    );
  }

  public ngOnDestroy(): void {
    this.darkModeService.disableDarkMode();
    this._subscription.clearAll(this);
  }
}
