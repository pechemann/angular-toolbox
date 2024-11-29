/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { DialogService } from 'projects/angular-toolbox/src/lib/component/dialog';
import { DialogSampleComponent } from './dialog-sample/dialog-sample.component';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './dialog-demo.component.html'
})
export class DialogDemoComponent {

  constructor(breadcrumb: BreadcrumbService,
              private dialog: DialogService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
              .addItem(breadcrumb.buildItem("Dialog Service"));
  }

  protected openDialog(): void {
    this.dialog.show(DialogSampleComponent);
  }

  protected documentation: DocumentationLink = {
    label: "Dialog API",
    commands: ['/resources', 'documentation', 'dialog-api']
  };
  protected title: string = "Dialog Service Demo (Experimental)";
  protected presentation: string = 'A service that allows Users to manage information displayed within the native <code>&lt;dialog&gt;</code> HTML element.<br>This component is part of the <a href="javascript:appBridge.navigate([\'resources/documentation/laf-less-components\'])" title="LAF-less API">LAF-less API</a>.';
  protected srcCode: CodeWrapper = {
    html: [`<!-- dialog-sample.component.html -->
<div class="card">
    <div class="card-header">
        Alert Popup Sample
    </div>
    <div class="card-body">
        <p class="card-text">
            <i class="bi bi-exclamation-triangle"></i>
            This message is displayed using the HTML5 <code>&lt;dialog&gt;</code> element.
        </p>
        <button (click)="dialog.hide()" class="btn btn-primary">Close</button>
    </div>
</div>`],
    typescript: [`@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><atx-dialog-outlet/>',
  standalone: true,
  imports: [
    RouterOutlet,
    DialogOutlet
  ]
})
export class AppComponent {}`,
`@Component({
  selector: 'app-dialog-sample',
  standalone: true,
  templateUrl: './dialog-sample.component.html'
})
export class DialogSampleComponent {

  constructor(protected dialog: DialogService) {}
}`,
`@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  template: '<button (click)="openDialog()">Open Dialog</button>'
})
export class DialogDemoComponent {

  constructor(private dialog: DialogService) {}

  protected openDialog(): void {
    this.dialog.show(DialogSampleComponent);
  }
}`],
css: [`/* App CSS Styles */

dialog {
    outline: none;
    border: none;
    background: none;

    &[open] {
        animation: fadeIn 0.35s forwards;

        &::backdrop {
            animation: backdropFadeIn 0.35s forwards;
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        translate: 0 -3em;
    }

    to {
        opacity: 1;
        translate: 0 0;
    }
}

@keyframes backdropFadeIn {
    from {
        background: hsl(0 0% 0% / 0%);
    }

    to {
        background: hsl(0 0% 0% / 75%);
    }
}`]
  };
}
