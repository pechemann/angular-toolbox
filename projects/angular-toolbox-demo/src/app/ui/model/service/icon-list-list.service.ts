/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Injectable } from '@angular/core';
import { IconListItem } from '../business/icon-list-item';

@Injectable({
  providedIn: 'root'
})
export class IconListService {

  public getHomeDemoList(): IconListItem[] {
    return [
      { label: "HTTP Mock Service", urlTree: ["../demo", "http-mock-service"] },
      { label: "Subscription Service", urlTree: ["../demo", "subscription-service"] },
      { label: "HTTP Mock Error", urlTree: ["../demo", "http-mock-error"] },
      { label: "Dark Mode Service", urlTree: ["../demo", "dark-mode-service"] },
      { label: "ButtonRole Directive", urlTree: ["../demo", "button-role-directive"] },
      { label: "Dark Mode Service: Bootstrap Integration", urlTree: ["../demo", "dark-mode-service-bootstrap"] },
      { label: "Scroll Service", urlTree: ["../demo", "scroll-service"] },
      { label: "Version Service", urlTree: ["../demo", "version-service"] }
    ];
  }

  public getHomeGuideList(): IconListItem[] {
    return [
      { label: "Angular Toolbox Resources",  urlTree: ['/resources'] },
      { label: "Angular Toolbox Quick Start Guide",  urlTree: ['/resources', 'documentation', 'quick-start-guide'] },
      { label: "Angular Toolbox Documentation",  urlTree: ['/resources', 'documentation'] },
      { label: "HTTP Mocking Framework",  urlTree: ['/resources', 'documentation', 'http-mocking-framework'] }
    ];
  }

  public getDocumentationList(): IconListItem[] {
    return [
      { label: "Quick Start Guide", urlTree: ['/resources', 'documentation', 'quick-start-guide'] },
      { label: "HTTP Mocking Framework", urlTree: ['/resources', 'documentation', 'http-mocking-framework'] },
      { label: "Subscription Service", /*urlTree: ['/resources', 'documentation']*/ },
      { label: "Dark Mode Service", /*urlTree: ['/resources', 'documentation']*/ },
      { label: "ButtonRole Directive", /*urlTree: ['/resources', 'documentation']*/ },
      { label: "AnchorLink Directive", /*urlTree: ['/resources', 'documentation']*/ },
      { label: "NavigateToUrlDirective Directive", /*urlTree: ['/resources', 'documentation']*/ },
      { label: "Version Service", /*urlTree: ['/resources', 'documentation']*/ },
      { label: "Scroll Service", /*urlTree: ['/resources', 'documentation']*/ },
      { label: "AppBridge Service", urlTree: ['/resources', 'documentation', 'app-bridge-service'] },
      { label: "Uuid Class", /*urlTree: ['/resources', 'documentation', 'uuid-class']*/ },
      { label: "Destroyable Interface", /*urlTree: ['/resources', 'documentation', 'destroyable-interface']*/ }
    ];
  }
}
