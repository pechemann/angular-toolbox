/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Injectable } from '@angular/core';
import { IconListItem } from '../business/icon-list-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DocumentationLinkMenu } from '../business/documentation-link';

@Injectable({
  providedIn: 'root'
})
export class IconListService {

  constructor(private _http: HttpClient) {}

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

  public getDocumentationList(): Observable<DocumentationLinkMenu> {
    return this._http.get<DocumentationLinkMenu>("https://pascalechemann.com/angular-toolbox/documentation/menu/menu.json");
  }
}
