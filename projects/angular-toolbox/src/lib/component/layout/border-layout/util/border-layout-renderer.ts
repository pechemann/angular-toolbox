/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EventEmitter, QueryList } from '@angular/core';
import { BorderLayoutContainer } from '../../border-layout-container/border-layout-container.component';
import { EMPTY_STRING } from '../../../../util';
import { Destroyable, LayoutConstraints, LayoutDragEvent, LayoutDragEventType, LayoutRegion, SubscriptionService } from '../../../../model';
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
 * @private
 */
const REGION_ERR_MSG: string = "A container with the same identifier has already been registered: ";

/**
 * @private
 */
const LAYOUT_ERR_MSG: string = "No layout container has been registered.";

/**
 * @private
 * A controller object responsible for handling user actions on a `BorderLayout` container.
 */
export class BorderLayoutRenderer extends IdentifiableComponent implements Destroyable {

  /**
   * Emits events each time the user starts, or stops dragging handle.
   */
  public readonly userAction: EventEmitter<LayoutDragEvent> = new EventEmitter(false);

  /**
   * @private
   */
  private lytContainerElm!: HTMLDivElement;
  
  /**
   * @private
   */
  private containerList: BorderLayoutContainer[] = [];
  
  /**
   * @private
   */
  private boundsManager: BorderLayoutBoundsManager; 

  /**
   * @private
   */
  constructor(private subscribeSvc: SubscriptionService) {
    super();
    this.boundsManager = new BorderLayoutBoundsManager();
  }

  /**
   * Add the list `BorderLayoutContainer` objects associated with the main container to this controller.
   * 
   * @param containers the list `BorderLayoutContainer` objects associated with the main container.
   */
  public addContainers(containers: QueryList<BorderLayoutContainer>): void {
    let regionValidator: string = EMPTY_STRING;
    containers.forEach(container => {
      const constraints: LayoutConstraints = container.constraints;
      const r: string = constraints.region as string;
      if (regionValidator.indexOf(r) !== -1) throw new SyntaxError(REGION_ERR_MSG + r);
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

  /**
   * Sets the reference to the HTML container associated with the main container.
   * 
   * @param lytContainer The reference to the HTML container associated with the main container.
   */
  public setLayoutContainer(lytContainer: HTMLDivElement): void {
    this.lytContainerElm = lytContainer;
  };

  /**
   * @private
   * For test purpose only.
   * Returns the reference to the internal `BorderLayoutBoundsManager` instance.
   */
  public getBoundsManager(): BorderLayoutBoundsManager {
    return this.boundsManager; 
  }

  /**
   * Makes this object elligible for garbage collection.
   */
  public destroy(): void {
    this.subscribeSvc.clearAll(this);
    this.containerList.length = 0;
    this.containerList = null as any;
    this.lytContainerElm = null as any;
    this.boundsManager.destroy();
    this.boundsManager = null as any;
  }

  /**
   * Forces the layout of all `BorderLayoutContainer` objects associated with the main container.
   */
  public paint(): void {
    this.checkLytContainer();
    this.render(this.lytContainerElm.offsetWidth);
  }

  /**
   * @private
   */
  private resizeEnter(container: BorderLayoutContainer): void {
    this.checkLytContainer();
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
    this.fireEvent(container, LayoutDragEventType.DRAG_START);
    const onMoveHandler = (event: MouseEvent)=> {
      event.preventDefault();
      event.stopPropagation();
      size = resizeMethod(event, width, height, minSize, maxSize);
      container.setSize(size);
      this.render(width);
      this.fireEvent(container, LayoutDragEventType.DRAGGING);
    };
    const onStopHandler = (event: MouseEvent)=> {
      event.preventDefault();
      event.stopPropagation();
      lytNativeElm.removeEventListener(MOUSEMOVE, onMoveHandler);
      lytNativeElm.removeEventListener(MOUSEUP, onStopHandler);
      size = resizeMethod(event, width, height, minSize, maxSize);
      container.setSize(size);
      this.render(width);
      this.fireEvent(container, LayoutDragEventType.DRAG_STOP);
    };
    lytNativeElm.addEventListener(MOUSEMOVE, onMoveHandler);
    lytNativeElm.addEventListener(MOUSEUP, onStopHandler);
  }

  /**
   * @private
   */
  private fireEvent(target: BorderLayoutContainer, type: LayoutDragEventType): void {
    const evt: LayoutDragEvent = new LayoutDragEvent(target, type);
    this.userAction.emit(evt);
  }

  /**
   * @private
   */
  private render(width: number): void {
    const bounds: DOMRect = this.boundsManager.getBounds();
    const top: number = bounds.top;
    const bottom: number = bounds.bottom;
    const left: number = bounds.left;
    const right: number = bounds.right;
    this.containerList.forEach((cont: BorderLayoutContainer) => {
      const r: LayoutRegion = cont.constraints.region as LayoutRegion;
      if (r === LayoutRegion.WEST) {
        cont.setTopPos(top);
        cont.setRightPos(width - left);
        cont.setBottomPos(bottom - top);
        return;
      }
      if (r === LayoutRegion.CENTER) {
        cont.setTopPos(top);
        cont.setLeftPos(left);
        cont.setRightPos(right - left);
        cont.setBottomPos(bottom - top);
        return;
      }
      if (r === LayoutRegion.EAST) {
        cont.setTopPos(top);
        cont.setLeftPos(width - (right - left));
        cont.setBottomPos(bottom - top);
      }
    });
  }

  private checkLytContainer(): void {
    if (!this.lytContainerElm) throw new ReferenceError(LAYOUT_ERR_MSG);
  }
}
