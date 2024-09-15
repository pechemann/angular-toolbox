/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { QueryList } from '@angular/core';
import { BorderLayoutContainer } from '../border-layout-container/border-layout-container.component';
import { EMPTY_STRING } from '../../../util';
import { Destroyable, LayoutConstraints, LayoutRegion, SubscriptionService } from '../../../model';
import { IdentifiableComponent } from '../../../core';

const MOUSEMOVE: any = "mousemove";
const MOUSEUP: any = "mouseup";
type ResizeMethod = (event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined)=> number;

export class BorderLayoutRenderer extends IdentifiableComponent implements Destroyable {

  private lytContainerElm!: HTMLDivElement;
  private containerList: BorderLayoutContainer[] = [];
  private topPos: number = 0;
  private leftPos: number = 0;
  private readonly BOUNDS: DOMRect = new DOMRect();

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
      this.setBounds(container);
      if (r === LayoutRegion.NORTH || r === LayoutRegion.SOUTH) return;
      this.containerList.push(container);
    });
  };

  public setLayoutContainer(lytContainer: HTMLDivElement) {
    this.lytContainerElm = lytContainer;
  };

  constructor(private subscribeSvc: SubscriptionService) {
    super("BorderLayout");
   }

  public destroy(): void {
    this.subscribeSvc.clearAll(this);
    this.containerList.length = 0;
    this.containerList = null as any;
    this.lytContainerElm = null as any;
  }

  public paint(): void {
    this.render(this.lytContainerElm.offsetWidth);
  }

  private northResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = event.clientY - this.topPos;
    if (maxSize && size > maxSize) return this.setY(maxSize);
    if (minSize && size < minSize) return this.setY(minSize);
    return this.setY(size);
  }

  private setY(y: number): number {
    this.BOUNDS.y = y;
    return y;
  }

  private southResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = height - (event.clientY - this.topPos);
    if (maxSize && size > maxSize) return this.setHeight(maxSize);
    if (minSize && size < minSize) return this.setHeight(minSize);
    return this.setHeight(size);
  }

  private setHeight(height: number): number {
    this.BOUNDS.height = height;
    return height;
  }

  private westResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = event.clientX - this.leftPos;
    if (maxSize && size > maxSize) return this.setX(maxSize);
    if (minSize && size < minSize) return this.setX(minSize);
    return this.setX(size);
  }

  private setX(x: number): number {
    this.BOUNDS.x = x;
    return x;
  }

  private eastResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = width - (event.clientX - this.leftPos);
    if (maxSize && size > maxSize) return this.setWidth(maxSize);
    if (minSize && size < minSize) return this.setWidth(minSize);
    return this.setWidth(size);
  }

  private setWidth(width: number): number {
    this.BOUNDS.width = width;
    return width;
  }

  private getResizeMethod(region: LayoutRegion): ResizeMethod {
    let method: ResizeMethod = this.southResize;
    switch (region) {
      case LayoutRegion.NORTH: method = this.northResize; break;
      case LayoutRegion.SOUTH: method = this.southResize; break;
      case LayoutRegion.WEST: method = this.westResize; break;
      case LayoutRegion.EAST: method = this.eastResize; break;
    }
    return method as any;
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
    this.topPos = bounds.y;
    this.leftPos = bounds.x;
    let resizeMethod: ResizeMethod = this.getResizeMethod(region).bind(this);
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

  private setBounds(container: BorderLayoutContainer): void {
    const r: LayoutRegion = container.constraints.region as LayoutRegion;
    if (r === LayoutRegion.NORTH) {
      this.BOUNDS.y = container.getSize();
      return;
    }
    if (r === LayoutRegion.SOUTH) {
      this.BOUNDS.height = container.getSize();
      return;
    }
    if (r === LayoutRegion.WEST) {
      this.BOUNDS.x = container.getSize();
      return;
    }
    if (r === LayoutRegion.EAST) this.BOUNDS.width = container.getSize();
  }

  private render(width: number): void {
    this.containerList.forEach(container => {
      const r: LayoutRegion = container.constraints.region as LayoutRegion;
      if (r === LayoutRegion.WEST) {
        container.setTopPos(this.BOUNDS.top);
        container.setRightPos(width - this.BOUNDS.left);
        container.setBottomPos(this.BOUNDS.bottom - this.BOUNDS.top);
        return;
      }
      if (r === LayoutRegion.CENTER) {
        container.setTopPos(this.BOUNDS.top);
        container.setLeftPos(this.BOUNDS.left);
        container.setRightPos(this.BOUNDS.right - this.BOUNDS.left);
        container.setBottomPos(this.BOUNDS.bottom - this.BOUNDS.top);
        return;
      }
      if (r === LayoutRegion.EAST) {
        container.setTopPos(this.BOUNDS.top);
        container.setLeftPos(width - (this.BOUNDS.right - this.BOUNDS.left));
        container.setBottomPos(this.BOUNDS.bottom - this.BOUNDS.top);
      }
    });
  }
}
