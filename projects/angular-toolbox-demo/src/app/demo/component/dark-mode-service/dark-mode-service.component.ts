import { Component, OnDestroy, OnInit } from '@angular/core';
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
  templateUrl: './dark-mode-service.component.html',
  styleUrls: ['./dark-mode-service.component.scss']
})
export class DarkModeServiceComponent implements OnDestroy {

  /**
   * We store the app dark mode state to not interfer with the demo.
   */
  private readonly _darkModeEnabled: boolean;

  constructor(public darkModeService: DarkModeService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Dark Mode Service"));
    this._darkModeEnabled = this.darkModeService.darkModeEnabled();
    this.darkModeService.disableDarkMode();
    console.log(this._darkModeEnabled)
  }

  public title: string = "Dark Mode Service Demo";
  public presentation: string = "A lightweight service that provides <em>Dark Mode</em> implementation for your Angular application.";
  public srcCode: CodeWrapper = {
    html: [`<button (click)="darkModeService.toggleDarkMode()"> Toggle Dark Mode </button>`],
    css: [`.dark-mode {
    background: navy;
    color: #fff;
}`],
    typescript:[`export class DarkModeServiceComponent {
    constructor(public darkModeService: DarkModeService) {}
}`]
  };

  public ngOnDestroy(): void {
    //--> We restore the app dark mode state.
    const isDarkMode: boolean = this.darkModeService.darkModeEnabled();
    if(this._darkModeEnabled && !isDarkMode) return this.darkModeService.enableDarkMode();
    if(!this._darkModeEnabled && isDarkMode) this.darkModeService.disableDarkMode();
  }
}
