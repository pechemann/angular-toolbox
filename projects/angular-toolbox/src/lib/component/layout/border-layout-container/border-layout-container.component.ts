/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input, HostBinding, ElementRef, EventEmitter } from '@angular/core';
import { LayoutConstraints, LayoutRegion } from '../../../model';

/**
 * @private
 */
const PX: string = "px";

/**
 * A container that defines the region of a `BorderLayout` component instance.
 */
@Component({
  selector: 'atx-border-layout-container',
  templateUrl: './border-layout-container.component.html',
  styleUrls: ['./border-layout-container.component.scss'],
  standalone: true
})
export class BorderLayoutContainer {

  /**
   * @private
   * Indicates to the parent `BorderLayout` instance that the user starts to resize this container.
   */
  public readonly resizeStart: EventEmitter<BorderLayoutContainer> = new EventEmitter(false);

  /**
   * Gets the CSS class associated with the region constraint of the `BorderLayoutContainer` object.
   */
  @HostBinding('class')
  get class(): string {
    return this.region;
  }

  /**
   * @private
   */
  protected region!: LayoutRegion;
  
  /**
   * @private
   */
  protected resizable: boolean = false;

  /**
   * @private
   */
  private atxConstraints!: LayoutConstraints;

  /**
   * @private
   */
  private size!: number;

  /**
   * @private
   */
  private readonly style: CSSStyleDeclaration;

  /**
   * Gets or sets the constraints for this `BorderLayoutContainer` object.
   */
  public get constraints(): LayoutConstraints  {
    return this.atxConstraints;
  }
  @Input()
  public set constraints(constraints: LayoutConstraints) {
    this.atxConstraints = constraints;
    this.region = constraints.region as LayoutRegion;
    if(constraints.resizable) this.initHandle();
    this.setSize(constraints.size);
  }

  /**
   * @private
   */
  constructor(private elRef: ElementRef) {
    this.style = this.elRef.nativeElement.style;
  }

  /**
   * Sets the size of this container depending on the specified region.
   * 
   * @param size The new size for this container, in pixels.
   */
  public setSize(size: number | undefined): void {
    const r: LayoutRegion = this.region;
    if (r === LayoutRegion.CENTER) return;
    if (r === LayoutRegion.NORTH || r === LayoutRegion.SOUTH) {
      this.size = size ? size : 50;
      this.style.height = this.size + PX;
      return;
    }
    if (r === LayoutRegion.EAST || r === LayoutRegion.WEST) {
      this.size = size ? size : 100;
      this.style.width = this.size + PX;
    }
  }

  /**
   * Returns the size of the container, in pixels.
   * 
   * @returns The size of the container.
   */
  public getSize(): number {
    return this.size;
  }

  /**
   * Sets the left-hand side position of this container.
   * 
   * @param position The left-hand side position of this container, in pixels.
   */
  public setLeftPos(position: number): void {
    this.style.left = position + PX;
  }

  /**
   * Sets the right-hand side position of this container.
   * 
   * @param position The right-hand side position of this container, in pixels.
   */
  public setRightPos(position: number): void {
    this.style.right = position + PX;
  }
  
  /**
   * Sets the top position of this container.
   * 
   * @param position The top position of this container, in pixels.
   */
  public setTopPos(position: number): void {
    this.style.top = position + PX;
  }
  
  /**
   * Sets the bottom position of this container.
   * 
   * @param position The bottom position of this container, in pixels.
   */
  public setBottomPos(position: number): void {
    this.style.bottom = position + PX;
  }

  /**
   * @private
   */
  protected resizetart(): void {
    this.resizeStart.emit(this);
  }

  /**
   * @private
   */
  private initHandle(): void {
    if (this.region === LayoutRegion.CENTER) return;
    this.resizable = true;
  }
}
