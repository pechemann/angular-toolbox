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
 * @private
 * A utility class that computes the size of all border layout containers.
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

  /**
   * @private
   * The bounds of the center container.
   */
  private bounds: DOMRect = new DOMRect();

  /**
   * Makes this object elligible for garbage collection.
   */
  public destroy(): void {
    this.bounds = null as any;
  }

  /**
   * Returns a rectangle that represents the bounds currently computed by this object.
   * 
   * @returns The bounds currently computed by this object.
   */
  public getBounds(): DOMRect {
    return this.bounds;
  }

  /**
   * Sets the top-left hand corner position before each bounds computaion.
   * 
   * @param x The x position of the main container, in pixels, before computaion.
   * @param y The y position of the main container, in pixels, before computaion.
   */
  public setOrigin(x: number, y: number): void {
    this.leftPos = x;
    this.topPos = y;
  }

  /**
   * Computes the size of a "north" container.
   * 
   * @param event The mouse event that triggered the computation of the container size.
   * @param width The width of the main container.
   * @param height The height of the main container.
   * @param minSize The minimum size of the container for which to compute the size.
   * @param maxSize The maximum size of the container for which to compute the size.
   * 
   * @returns The size of a "north" container.
   */
  public northResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = event.clientY - this.topPos;
    if (maxSize && size > maxSize) return this.setY(maxSize);
    if (minSize && size < minSize) return this.setY(minSize);
    return this.setY(size);
  }

  /**
   * @private
   */
  private setY(y: number): number {
    this.bounds.y = y;
    return y;
  }

  /**
   * Computes the size of a "south" container.
   * 
   * @param event The mouse event that triggered the computation of the container size.
   * @param width The width of the main container.
   * @param height The height of the main container.
   * @param minSize The minimum size of the container for which to compute the size.
   * @param maxSize The maximum size of the container for which to compute the size.
   * 
   * @returns The size of a "south" container.
   */
  public southResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = height - (event.clientY - this.topPos);
    if (maxSize && size > maxSize) return this.setHeight(maxSize);
    if (minSize && size < minSize) return this.setHeight(minSize);
    return this.setHeight(size);
  }

  /**
   * @private
   */
  private setHeight(height: number): number {
    this.bounds.height = height;
    return height;
  }

  /**
   * Computes the size of a "west" container.
   * 
   * @param event The mouse event that triggered the computation of the container size.
   * @param width The width of the main container.
   * @param height The height of the main container.
   * @param minSize The minimum size of the container for which to compute the size.
   * @param maxSize The maximum size of the container for which to compute the size.
   * 
   * @returns The size of a "west" container.
   */
  public westResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = event.clientX - this.leftPos;
    if (maxSize && size > maxSize) return this.setX(maxSize);
    if (minSize && size < minSize) return this.setX(minSize);
    return this.setX(size);
  }

  /**
   * @private
   */
  private setX(x: number): number {
    this.bounds.x = x;
    return x;
  }

  /**
   * Computes the size of a "east" container.
   * 
   * @param event The mouse event that triggered the computation of the container size.
   * @param width The width of the main container.
   * @param height The height of the main container.
   * @param minSize The minimum size of the container for which to compute the size.
   * @param maxSize The maximum size of the container for which to compute the size.
   * 
   * @returns The size of a "east" container.
   */
  public eastResize(event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined): number {
    const size: number = width - (event.clientX - this.leftPos);
    if (maxSize && size > maxSize) return this.setWidth(maxSize);
    if (minSize && size < minSize) return this.setWidth(minSize);
    return this.setWidth(size);
  }

  /**
   * @private
   */
  private setWidth(width: number): number {
    this.bounds.width = width;
    return width;
  }

  /**
   * Invoked after each `BorderLayoutContainer` registration to initialize the center container bounds.
   * 
   * @param container A `BorderLayoutContainer` instance added to the main container. 
   */
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
  
  /**
   * Returns the method used to compute the size of a container, depending on the specified region.
   * 
   * @param region The region associated with the container for which to compute the size.
   * 
   * @returns The method used to compute the size of a container.
   */
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
