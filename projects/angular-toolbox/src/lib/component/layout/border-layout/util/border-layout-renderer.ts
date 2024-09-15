/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { QueryList } from '@angular/core';
import { BorderLayoutContainer } from '../../border-layout-container/border-layout-container.component';
import { EMPTY_STRING } from '../../../../util';
import { Destroyable, LayoutConstraints, LayoutRegion, SubscriptionService } from '../../../../model';
import { IdentifiableComponent } from '../../../../core';
import { BorderLayoutBoundsManager } from './border-layout-bounds-manager';
import { ResizeMethod } from './resize-method';

/**
 * @private
 */
const MOUSEMOVE: any = "mousemove";

/**
 * @private
 */
const MOUSEUP: any = "mouseup";

/**
 * 
 */
export class BorderLayoutRenderer extends IdentifiableComponent implements Destroyable {

  private lytContainerElm!: HTMLDivElement;
  private containerList: BorderLayoutContainer[] = [];
  private boundsManager: BorderLayoutBoundsManager; 

  /**
   * @private
   */
  constructor(private subscribeSvc: SubscriptionService) {
    super();
    this.boundsManager = new BorderLayoutBoundsManager();
  }

  public addContainers(containers: QueryList<BorderLayoutContainer>) {
    let regionValidator: string = EMPTY_STRING;
    containers.forEach(container => {
      const constraints: LayoutConstraints = container.constraints;
      const r: string = constraints.region as string;
      if (regionValidator.indexOf(r) !== -1) throw new SyntaxError("A container with the same identifier has already been registered: " + r);
      regionValidator += r;
      if (constraints.resizable) {
        this.subscribeSvc.register(this,
          container.resizeStart.subscribe(container=> this.resizeEnter(container))
        );
      }
      this.boundsManager.initBounds(container);
      if (r === LayoutRegion.NORTH || r === LayoutRegion.SOUTH) return;
      this.containerList.push(container);
    });
  };

  public setLayoutContainer(lytContainer: HTMLDivElement) {
    this.lytContainerElm = lytContainer;
  };

  /**
   * @private
   * For test purpose only.
   */
  public getBoundsManager(): BorderLayoutBoundsManager {
    return this.boundsManager; 
  }

  public destroy(): void {
    this.subscribeSvc.clearAll(this);
    this.containerList.length = 0;
    this.containerList = null as any;
    this.lytContainerElm = null as any;
    if (!this.boundsManager) return;
    this.boundsManager.destroy();
    this.boundsManager = null as any;
  }

  public paint(): void {
    this.render(this.lytContainerElm.offsetWidth);
  }

  private resizeEnter(container: BorderLayoutContainer): void {
    const lytNativeElm: HTMLDivElement = this.lytContainerElm;
    const width: number = lytNativeElm.offsetWidth;
    const height: number = lytNativeElm.offsetHeight;
    const bounds: DOMRect = lytNativeElm.getBoundingClientRect();
    const constraints: LayoutConstraints = container.constraints;
    const region: LayoutRegion = constraints.region as LayoutRegion;
    const minSize: number | undefined = constraints.minSize;
    const maxSize: number | undefined = constraints.maxSize;
    let size: number = 0;
    this.boundsManager.setOrigin(bounds.x, bounds.y);
    let resizeMethod: ResizeMethod = this.boundsManager.getResizeMethod(region);
    const onMoveHandler = (event: MouseEvent)=> {
      event.preventDefault();
      event.stopPropagation();
      size = resizeMethod(event, width, height, minSize, maxSize);
      container.setSize(size);
      this.render(width);
    };
    const onStopHandler = (event: MouseEvent)=> {
      event.preventDefault();
      event.stopPropagation();
      lytNativeElm.removeEventListener(MOUSEMOVE, onMoveHandler);
      lytNativeElm.removeEventListener(MOUSEUP, onStopHandler);
      size = resizeMethod(event, width, height, minSize, maxSize);
      container.setSize(size);
      this.render(width);
    };
    lytNativeElm.addEventListener(MOUSEMOVE, onMoveHandler);
    lytNativeElm.addEventListener(MOUSEUP, onStopHandler)
  }

  private render(width: number): void {
    const bounds: DOMRect = this.boundsManager.getBounds();
    this.containerList.forEach(container => {
      const r: LayoutRegion = container.constraints.region as LayoutRegion;
      if (r === LayoutRegion.WEST) {
        container.setTopPos(bounds.top);
        container.setRightPos(width - bounds.left);
        container.setBottomPos(bounds.bottom - bounds.top);
        return;
      }
      if (r === LayoutRegion.CENTER) {
        container.setTopPos(bounds.top);
        container.setLeftPos(bounds.left);
        container.setRightPos(bounds.right - bounds.left);
        container.setBottomPos(bounds.bottom - bounds.top);
        return;
      }
      if (r === LayoutRegion.EAST) {
        container.setTopPos(bounds.top);
        container.setLeftPos(width - (bounds.right - bounds.left));
        container.setBottomPos(bounds.bottom - bounds.top);
      }
    });
  }
}
