/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, ViewChild } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { BorderLayout, BorderLayoutContainer, LayoutConstraints, LayoutDragEvent, LayoutDragEventType, LayoutRegion, LayoutRegionType } from 'projects/angular-toolbox/src/public-api';

type EventRef = { size: number, type: LayoutDragEventType, region: LayoutRegion };

@Component({
  selector: 'app-border-layout-demo',
  standalone: true,
  imports: [
    DemoComponent,
    BorderLayout,
    BorderLayoutContainer
  ],
  templateUrl: './border-layout-demo.component.html',
  styleUrls: ['./border-layout-demo.component.scss']
})
export class BorderLayoutDemoComponent {

  protected eventList: EventRef[] = [];
  protected westContainerSize: number = 100;

  @ViewChild("borderLayout")
  private borderLayout!: BorderLayout;

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
              .addItem(breadcrumb.buildItem("BorderLayout Component"));
  }

  protected registerEvent(event: LayoutDragEvent): void {
    const target: BorderLayoutContainer = event.target;
    this.eventList.push({
      type: event.type,
      size: Math.round(target.getSize()),
      region: target.constraints.region as LayoutRegion
    });
  }

  protected parseInt(value: string): number {
    return parseInt(value);
  }

  protected updateConstraints(event: Event): void {
    const tgt: HTMLInputElement = event.target as HTMLInputElement;
    const constraints: LayoutConstraints = {
      region: LayoutRegion.EAST,
      resizable: tgt.checked,
      maxSize: 400,
      minSize: 140
    };
    this.borderLayout.setConstraints(constraints);
  }

  protected documentation: DocumentationLink = {
    label: "Border Layout",
    commands: ['/resources', 'documentation', 'border-layout']
  };
  protected title: string = "BorderLayout Component Demo";
  protected presentation: string = 'A container that arranges and resizes its components to fit in five regions: north, south, east, west, and center..<br>This component is part of the <a href="javascript:appBridge.navigate([\'resources/documentation/laf-less-components\'])" title="LAF-less API">LAF-less API</a>.';
  protected srcCode: CodeWrapper = {
    html: [`<div class="wrapper w-100">
    <atx-border-layout (dragStart)="registerEvent($event)" (dragStop)="registerEvent($event)">
        <atx-border-layout-container [constraints]="{ region: 'north', size: 80 }">
          <button class="btn btn-secondary w-100 h-100">North<br><em>(button)</em></button>
        </atx-border-layout-container>
        <atx-border-layout-container [constraints]="{ region: 'west' }">
            <div class="border h-100 p-1 bg-light">
                <h6>West</h6>
            </div>
        </atx-border-layout-container>
        <atx-border-layout-container [constraints]="{ region: 'center' }">
            <div class="border h-100 p-1 bg-info-subtle">
                <h6>Center</h6>
            </div>
        </atx-border-layout-container>
        <atx-border-layout-container [constraints]="{ region: 'east', resizable: true, size: 250, maxSize: 400, minSize: 140 }">
            <div class="border h-100 p-1 bg-light">
                <h6>East</h6>
                <em>(resizable panel)</em>
            </div>
        </atx-border-layout-container>
        <atx-border-layout-container [constraints]="{ region: 'south', resizable: true, size: 150, maxSize: 250, minSize: 60 }">
            <div class="border h-100 p-1 bg-body-secondary">
                <h6>South</h6>
                <em>(resizable panel)</em>
            </div>
        </atx-border-layout-container>
    </atx-border-layout>
</div>
<h6>Events:</h6>
<ul>
    @for (evt of eventList; track evt) {
        <li>
            {{ evt.type }}: region = {{ evt.region }}, size = {{ evt.size }}px
        </li>
    }
</ul>`],
  css: [`.wrapper {
  height: 500px;
  --atx-handle-color: orange;
}`],
typescript: [`type EventRef = { size: number, type: LayoutDragEventType, region: LayoutRegion };

@Component({
  selector: 'app-border-layout-demo',
  standalone: true,
  imports: [
    DemoComponent,
    BorderLayout,
    BorderLayoutContainer
  ],
  templateUrl: './border-layout-demo.component.html',
  styleUrls: ['./border-layout-demo.component.scss']
})
export class BorderLayoutDemoComponent {

  protected eventList: EventRef[] = [];

  protected registerEvent(event: LayoutDragEvent): void {
    const target: BorderLayoutContainer = event.target;
    this.eventList.push({
      type: event.type,
      size: Math.round(target.getSize()),
      region: target.constraints.region as LayoutRegion
    });
  }
}
`]
  };
}
