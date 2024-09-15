/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AfterViewInit, Component, ContentChildren, OnDestroy, ElementRef, ViewChild, HostListener, QueryList } from '@angular/core';
import { BorderLayoutContainer } from '../border-layout-container/border-layout-container.component';
import { SubscriptionService } from '../../../model';
import { BorderLayoutRenderer } from './border-layout-renderer';

@Component({
  selector: 'atx-border-layout',
  templateUrl: './border-layout.component.html',
  styleUrls: ['./border-layout.component.scss'],
  standalone: true
})
export class BorderLayout implements AfterViewInit, OnDestroy {

  @HostListener("window:resize")
  private onResize(): void {
    this.paint();
  }

  @ViewChild("atxLayoutContainer")
  private layoutContainer!: ElementRef<HTMLDivElement>;

  private renderer: BorderLayoutRenderer;

  @ContentChildren(BorderLayoutContainer)
  private set __containers__(containers: QueryList<BorderLayoutContainer>) {
    this.renderer.addContainers(containers);
  };

  constructor(subscribeSvc: SubscriptionService) {
    this.renderer = new BorderLayoutRenderer(subscribeSvc);
  }

  /**
   * @private
   * For test purpose.
   */
  public getRenderer(): BorderLayoutRenderer {
    return this.renderer;
  }

  public ngOnDestroy(): void {
    this.renderer.destroy();
    this.renderer = null as any;
  }

  public ngAfterViewInit(): void {
    this.renderer.setLayoutContainer(this.layoutContainer.nativeElement);
    this.paint();
  }

  public paint(): void {
    this.renderer.paint();
  }
}
