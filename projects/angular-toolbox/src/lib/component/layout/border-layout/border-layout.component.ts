/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AfterViewInit, Component, ContentChildren, OnDestroy, ElementRef, ViewChild, HostListener, QueryList } from '@angular/core';
import { BorderLayoutContainer } from '../border-layout-container/border-layout-container.component';
import { EMPTY_STRING } from '../../../util';
import { LayoutConstraints, LayoutRegion, SubscriptionService } from '../../../model';
import { IdentifiableComponent } from '../../../core';

const MOUSEMOVE: any = "mousemove";
const MOUSEUP: any = "mouseup";
type ResizeMethod = (event: MouseEvent, width: number, height: number)=> number;

@Component({
  selector: 'atx-border-layout',
  templateUrl: './border-layout.component.html',
  styleUrls: ['./border-layout.component.scss'],
  standalone: true
})
export class BorderLayout extends IdentifiableComponent implements AfterViewInit, OnDestroy {

  @HostListener("window:resize")
  private onResize(): void {
    this.paintLayout();
  }

  @ViewChild("atxLayoutContainer")
  private layoutContainer!: ElementRef<HTMLDivElement>;
  private lytContainerElm!: HTMLDivElement;
  private containerList: BorderLayoutContainer[] = [];
  private topPos: number = 0;
  private leftPos: number = 0;
  private readonly BOUNDS: DOMRect = new DOMRect();

  @ContentChildren(BorderLayoutContainer)
  private set __containers__(containers: QueryList<BorderLayoutContainer>) {
    let regionValidator: string = EMPTY_STRING;
    containers.forEach(container => {
      const constraints: LayoutConstraints = container.constraints;
      const r: string = constraints.region as string;
      if (regionValidator.indexOf(r) !== -1) throw new SyntaxError();
      regionValidator += r;
      if (container.constraints.resizable) this.subscribeSvc.register(this, container.resizeStart.subscribe(container=> this.resizeEnter(container)));
      this.containerList.push(container);
      this.setBounds(container);
    });
  };

  constructor(private subscribeSvc: SubscriptionService) {
    super("BorderLayout");
   }

  public ngOnDestroy(): void {
    this.subscribeSvc.clearAll(this);
  }

  public ngAfterViewInit(): void {
    this.lytContainerElm = this.layoutContainer.nativeElement;
    this.paintLayout();
  }

  private paintLayout(): void {
    this.repaint(this.lytContainerElm.offsetWidth);
  }

  private northResize(event: MouseEvent, width: number, height: number): number {
    const size: number = event.clientY - this.topPos;
    this.BOUNDS.y = size;
    return size;
  }

  private southResize(event: MouseEvent, width: number, height: number): number {
    const size: number = height - (event.clientY - this.topPos);
    this.BOUNDS.height = size;
    return size;
  }

  private westResize(event: MouseEvent, width: number, height: number): number {
    const size: number = event.clientX - this.leftPos;
    this.BOUNDS.x = size;
    return size;
  }

  private eastResize(event: MouseEvent, width: number, height: number): number {
    const size: number = width - (event.clientX - this.leftPos);
    this.BOUNDS.width = size;
    return size;
  }

  private getResizeMethod(container: BorderLayoutContainer): ResizeMethod {
    let method: ResizeMethod = this.southResize;
    switch (container.constraints.region) {
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
    let size: number = 0;
    this.topPos = bounds.y;
    this.leftPos = bounds.x;
    let resizeMethod: ResizeMethod = this.getResizeMethod(container).bind(this);
    const onMoveHandler = (event: MouseEvent)=> {
      event.preventDefault();
      event.stopPropagation();
      size = resizeMethod(event, width, height);
      container.setSize(size);
      this.repaint(width);
    };
    const onStopHandler = (event: MouseEvent)=> {
      event.preventDefault();
      event.stopPropagation();
      lytNativeElm.removeEventListener(MOUSEMOVE, onMoveHandler);
      lytNativeElm.removeEventListener(MOUSEUP, onStopHandler);
      size = resizeMethod(event, width, height);
      container.setSize(size);
      this.repaint(width);
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

  private repaint(width: number): void {
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
