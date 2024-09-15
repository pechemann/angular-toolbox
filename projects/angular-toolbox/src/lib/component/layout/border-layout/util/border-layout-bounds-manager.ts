/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BorderLayoutContainer } from '../../border-layout-container/border-layout-container.component';
import { Destroyable, LayoutRegion, } from '../../../../model';
import { ResizeMethod } from './resize-method';

/**
 * 
 */
export class BorderLayoutBoundsManager implements Destroyable {

  /**
   * @private
   * The container top position when the user starts to drag the handle.
   */
  private topPos: number = 0;

  /**
   * @private
   * The container left position when the user starts to drag the handle.
   */
  private leftPos: number = 0;

  private bounds: DOMRect = new DOMRect();

  public destroy(): void {
    this.bounds = null as any;
  }

  public getBounds(): DOMRect {
    return this.bounds;
  }

  public setOrigin(x: number, y: number): void {
    this.leftPos = x;
    this.topPos = y;
  }

  public northResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = event.clientY - this.topPos;
    if (maxSize && size > maxSize) return this.setY(maxSize);
    if (minSize && size < minSize) return this.setY(minSize);
    return this.setY(size);
  }

  private setY(y: number): number {
    this.bounds.y = y;
    return y;
  }

  public southResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = height - (event.clientY - this.topPos);
    if (maxSize && size > maxSize) return this.setHeight(maxSize);
    if (minSize && size < minSize) return this.setHeight(minSize);
    return this.setHeight(size);
  }

  private setHeight(height: number): number {
    this.bounds.height = height;
    return height;
  }

  public westResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = event.clientX - this.leftPos;
    if (maxSize && size > maxSize) return this.setX(maxSize);
    if (minSize && size < minSize) return this.setX(minSize);
    return this.setX(size);
  }

  private setX(x: number): number {
    this.bounds.x = x;
    return x;
  }

  public eastResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = width - (event.clientX - this.leftPos);
    if (maxSize && size > maxSize) return this.setWidth(maxSize);
    if (minSize && size < minSize) return this.setWidth(minSize);
    return this.setWidth(size);
  }

  private setWidth(width: number): number {
    this.bounds.width = width;
    return width;
  }

  public initBounds(container: BorderLayoutContainer): void {
    const r: LayoutRegion = container.constraints.region as LayoutRegion;
    if (r === LayoutRegion.NORTH) {
      this.bounds.y = container.getSize();
      return;
    }
    if (r === LayoutRegion.SOUTH) {
      this.bounds.height = container.getSize();
      return;
    }
    if (r === LayoutRegion.WEST) {
      this.bounds.x = container.getSize();
      return;
    }
    if (r === LayoutRegion.EAST) this.bounds.width = container.getSize();
  }
  
  public getResizeMethod(region: LayoutRegion): ResizeMethod {
    let method: ResizeMethod = this.southResize;
    switch (region) {
      case LayoutRegion.NORTH: method = this.northResize; break;
      case LayoutRegion.SOUTH: method = this.southResize; break;
      case LayoutRegion.WEST: method = this.westResize; break;
      case LayoutRegion.EAST: method = this.eastResize; break;
    }
    return method.bind(this) as any;
  }

}
