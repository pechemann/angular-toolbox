/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input, HostBinding, ElementRef, EventEmitter } from '@angular/core';
import { LayoutConstraints, LayoutRegion } from '../../../model';

const PX: string = "px";

@Component({
  selector: 'atx-border-layout-container',
  templateUrl: './border-layout-container.component.html',
  styleUrls: ['./border-layout-container.component.scss'],
  standalone: true
})
export class BorderLayoutContainer {

  public readonly resizeStart: EventEmitter<BorderLayoutContainer> = new EventEmitter();

  @HostBinding('class') get class(): string {
    return this.region;
  }

  protected region!: LayoutRegion;
  protected resizable: boolean = false;

  private atxConstraints!: LayoutConstraints;
  private size!: number;

  private readonly style: CSSStyleDeclaration;

  @Input()
  public set constraints(constraints: LayoutConstraints) {
    this.atxConstraints = constraints;
    this.region = constraints.region as LayoutRegion;
    if(constraints.resizable) this.initHandle();
    this.setSize(constraints.size);
  }

  public get constraints(): LayoutConstraints  {
    return this.atxConstraints;
  }

  constructor(private elRef: ElementRef) {
    this.style = this.elRef.nativeElement.style;
  }

  public setSize(size: number | undefined): void {
    const r: LayoutRegion = this.region;
    if (r === LayoutRegion.CENTER) return;
    if (r === LayoutRegion.NORTH || r === LayoutRegion.SOUTH) {
      this.size = size ? size : 50;
    } else if (r === LayoutRegion.EAST || r === LayoutRegion.WEST) {
      this.size = size ? size : 100;
    }
    this.style.height = this.size + PX;
  }

  public getSize(): number {
    return this.size;
  }

  public setLeftPos(position: number): void {
    this.style.left = position + PX;
  }

  public setRightPos(position: number): void {
    this.style.right = position + PX;
  }
  
  public setTopPos(position: number): void {
    this.style.top = position + PX;
  }
  
  public setBottomPos(position: number): void {
    this.style.bottom = position + PX;
  }

  protected resizetart(): void {
    this.resizeStart.emit(this);
  }

  private initHandle(): void {
    if (this.region === LayoutRegion.CENTER) return;
    this.resizable = true;
  }
}
