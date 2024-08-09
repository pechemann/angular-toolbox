/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DocumentationMenu } from '../business/documentation-link';
import { IconListItem } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class IconListService {

  constructor(private _http: HttpClient) {}

  public getDemoList(): IconListItem[] {
    return [
      { label: "HTTP Mock Service", urlTree: ["../demo", "http-mock-service"] },
      { label: "Subscription Service", urlTree: ["../demo", "subscription-service"] },
      { label: "Logging Framework", urlTree: ["../demo", "logging-framework"] },
      { label: "HTTP Mock Error", urlTree: ["../demo", "http-mock-error"] },
      { label: "Dark Mode Service", urlTree: ["../demo", "dark-mode-service"] },
      { label: "ButtonRole Directive", urlTree: ["../demo", "button-role-directive"] },
      { label: "Dark Mode Service: Bootstrap Integration", urlTree: ["../demo", "dark-mode-service-bootstrap"] },
      { label: "Scroll Service", urlTree: ["../demo", "scroll-service"] },
      { label: "Version Service", urlTree: ["../demo", "version-service"] },
      { label: "ArrayList Class", urlTree: ["../demo", "array-list"] }
    ];
  }

  public getHomeGuideList(): IconListItem[] {
    return [
      { label: "Angular Toolbox Resources",  urlTree: ['/resources'] },
      { label: "Angular Toolbox Quick Start Guide",  urlTree: ['/resources', 'documentation', 'quick-start-guide'] },
      { label: "HTTP Mocking Framework",  urlTree: ['/resources', 'documentation', 'http-mocking-framework'] },
      { label: "Angular Toolbox Documentation",  urlTree: ['/resources', 'documentation'] }
    ];
  }

  public getDocumentationList(): Observable<DocumentationMenu> {
    return this._http.get<DocumentationMenu>("https://pascalechemann.com/angular-toolbox/documentation/menu/menu.json");
  }
}
