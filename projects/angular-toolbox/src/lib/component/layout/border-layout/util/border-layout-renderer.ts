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
import { Destroyable, LayoutConstraints, LayoutDragEvent, LayoutDragEventType, LayoutRegion, LayoutRegionType, SubscriptionService, LayoutRegionError } from '../../../../model';
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
  public readonly userAction: EventEmitter<LayoutDragEvent> = new EventEmitter();

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
  private storedStopHandler: any = null;

  /**
   * @private
   */
  private storedMoveHandler: any = null;

  /**
   * @private
   */
  constructor(private subscribeSvc: SubscriptionService,
              private document: Document) {
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
      if (regionValidator.indexOf(r) !== -1) throw new LayoutRegionError(REGION_ERR_MSG + r);
      regionValidator += r;
      this.subscribeSvc.register(this,
        container.resizeStart.subscribe(container=> this.resizeEnter(container))
      );
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
   * Changes the constraints of the region specified by the `LayoutConstraints.region` property.
   * 
   * @param constraints The new constraints of the associated region.
   */
  public setConstraints(constraints: LayoutConstraints): void {
    const region: LayoutRegionType = constraints.region as LayoutRegionType;
    const container: BorderLayoutContainer | undefined = this.containerList.find((container: BorderLayoutContainer) => container.constraints.region === region);
    if (!container) throw new LayoutRegionError(`Invalid region: no container with the region '${region}' has been found.`);
    if (constraints.size === undefined) constraints.size = container.getSize();
    container.constraints = constraints;
    this.paint();
  }

  /**
   * Makes this object elligible for garbage collection.
   */
  public destroy(): void {
    if (this.storedStopHandler) {
      this.document.removeEventListener(MOUSEMOVE, this.storedMoveHandler);
      this.document.removeEventListener(MOUSEUP, this.storedStopHandler);
      this.deleteStoredHandlers();
    }
    this.subscribeSvc.clearAll(this);
    this.lytContainerElm = null as any;
    this.boundsManager.destroy();
    this.boundsManager = null as any;
    this.containerList.length = 0;
    this.containerList = null as any;
  }

  /**
   * Forces the layout of all `BorderLayoutContainer` objects associated with the main container.
   */
  public paint(): void {
    this.checkLytContainer();
    this.render(this.lytContainerElm.offsetWidth);
  }

  /**
   * Resizes the specified region of the associated container.
   * 
   * @param region The region to resize.
   * @param size The new size of the region to resize.
   * 
   * @returns `true` whether the specified region has been resized; `false` otherwise.
   */
  public resizeRegion(region: LayoutRegion, size: number): boolean {
    if (region === LayoutRegion.CENTER) return false;
    const container: BorderLayoutContainer | undefined = this.containerList.find((c: BorderLayoutContainer)=> {
      return c.constraints.region === region;
    });
    if (!container) return false;
    container.setSize(size);
    this.boundsManager.initBounds(container);
    this.paint();
    return true;
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
    const doc: Document = this.document;
    let size: number = 0;
    this.boundsManager.setOrigin(bounds.x, bounds.y);
    let resizeMethod: ResizeMethod = this.boundsManager.getResizeMethod(region);
    container.selected = true;
    const onMoveHandler = (event: MouseEvent)=> {
      event.stopPropagation();
      event.preventDefault();
      size = resizeMethod(event, width, height, minSize, maxSize);
      container.setSize(size);
      this.render(width);
      this.fireEvent(container, LayoutDragEventType.DRAGGING);
    };
    const onStopHandler = (event: MouseEvent)=> {
      event.stopPropagation();
      event.preventDefault();
      doc.removeEventListener(MOUSEMOVE, onMoveHandler);
      doc.removeEventListener(MOUSEUP, onStopHandler);
      this.deleteStoredHandlers();
      container.selected = false;
      size = resizeMethod(event, width, height, minSize, maxSize);
      container.setSize(size);
      this.render(width);
      this.fireEvent(container, LayoutDragEventType.DRAG_STOP);
    };
    this.storedMoveHandler = onMoveHandler;
    this.storedStopHandler = onStopHandler;
    this.fireEvent(container, LayoutDragEventType.DRAG_START);
    doc.addEventListener(MOUSEMOVE, onMoveHandler);
    doc.addEventListener(MOUSEUP, onStopHandler);
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
    const cList: BorderLayoutContainer[] = this.containerList;
    let cursor: number = cList.length - 1;
    while(cursor >= 0) {
      const cont: BorderLayoutContainer = cList[cursor];
      const r: LayoutRegion = cont.constraints.region as LayoutRegion;
      cursor--;
      if (r === LayoutRegion.WEST) {
        cont.setTopPos(top);
        cont.setRightPos(width - left);
        cont.setBottomPos(bottom - top);
        continue;
      }
      if (r === LayoutRegion.CENTER) {
        cont.setTopPos(top);
        cont.setLeftPos(left);
        cont.setRightPos(right - left);
        cont.setBottomPos(bottom - top);
        continue;
      }
      if (r === LayoutRegion.EAST) {
        cont.setTopPos(top);
        cont.setLeftPos(width - (right - left));
        cont.setBottomPos(bottom - top);
        continue;
      }
    };
  }

  /**
   * @private
   */
  private checkLytContainer(): void {
    if (!this.lytContainerElm) throw new ReferenceError(LAYOUT_ERR_MSG);
  }
  
  /**
   * @private
   */
  private deleteStoredHandlers(): void {
    this.storedMoveHandler = this.storedStopHandler = null;
  }
}
