/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, OnDestroy } from '@angular/core';
import { DarkModeService } from 'angular-toolbox';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';

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

  protected documentation: DocumentationLink = {
    label: "Dark Mode Service",
    commands: ['/resources', 'documentation', 'dark-mode-service']
  };
  protected title: string = "Dark Mode Service Demo";
  protected presentation: string = "A lightweight service that provides <em>Dark Mode</em> implementation for your Angular application.";
  protected srcCode: CodeWrapper = {
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
