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
import { BorderLayoutRenderer } from './util/border-layout-renderer';

/**
 * A border layout lays out a container, arranging and resizing its components to fit in five regions: north, south, east, west, and center.
 * Each region is defined by a `BorderLayoutContainer` instance, and is identified by a corresponding constant: `NORTH`, `SOUTH`, `EAST`, `WEST`, and `CENTER`.
 */
@Component({
  selector: 'atx-border-layout',
  templateUrl: './border-layout.component.html',
  styleUrls: ['./border-layout.component.scss'],
  standalone: true
})
export class BorderLayout implements AfterViewInit, OnDestroy {

  /**
   * @private
   */
  @HostListener("window:resize")
  private onResize(): void {
    this.paint();
  }

  /**
   * @private
   */
  @ViewChild("atxLayoutContainer")
  private layoutContainer!: ElementRef<HTMLDivElement>;

  /**
   * @private
   */
  private renderer: BorderLayoutRenderer;

  /**
   * @private
   */
  @ContentChildren(BorderLayoutContainer)
  private set __containers__(containers: QueryList<BorderLayoutContainer>) {
    this.renderer.addContainers(containers);
  };

  /**
   * @private
   */
  constructor(subscribeSvc: SubscriptionService) {
    this.renderer = new BorderLayoutRenderer(subscribeSvc);
  }

  /**
   * @private
   * For test purpose only.
   */
  public getRenderer(): BorderLayoutRenderer {
    return this.renderer;
  }

  /**
   * @private
   */
  public ngOnDestroy(): void {
    this.renderer.destroy();
  }

  /**
   * @private
   */
  public ngAfterViewInit(): void {
    this.renderer.setLayoutContainer(this.layoutContainer.nativeElement);
    this.paint();
  }

  /**
   * Forces the container to be redrawn.
   */
  public paint(): void {
    this.renderer.paint();
  }
}
