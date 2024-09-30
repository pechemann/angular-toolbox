/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { AngularToolboxCodeViewportComponent, AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { MONITORING_MOCK_CONFIG } from '../mock/monitoring/http-mock-config';
import { AtxMockDocumentation, DropdownComponent, HttpMockConfig } from 'projects/angular-toolbox/src/public-api';
import { MESSAGE_PROXY_MOCK_CONFIG } from '../mock/proxy-antipattern/http-mock-config';
import { SAY_HELLO_MOCK_CONFIG } from '../mock/say-hello/http-mock-config';
import { TODOS_MOCK_CONFIG } from '../mock/todo/http-mock-config';

type HttpMockConfigRef = {
  label: string,
  config: HttpMockConfig
};

@Component({
  selector: 'app-resources-documentation',
  standalone: true,
  imports: [
    AngularToolboxPageTitleComponent,
    AngularToolboxCodeViewportComponent,
    AtxMockDocumentation,
    DropdownComponent
  ],
  templateUrl: './resources-documentation.component.html'
})
export class ResourcesDocumentationComponent {
  
  protected configList: HttpMockConfigRef[] = [
    { label: "Monitoring API", config: MONITORING_MOCK_CONFIG },
    { label: "Proxy Antipattern API", config: MESSAGE_PROXY_MOCK_CONFIG },
    { label: "SayHello API", config: SAY_HELLO_MOCK_CONFIG },
    { label: "TODO API", config: TODOS_MOCK_CONFIG }
  ];

  protected selectedConfig: HttpMockConfigRef = this.configList[0];
}
