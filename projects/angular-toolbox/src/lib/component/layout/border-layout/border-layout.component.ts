/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AfterViewInit, Component, ContentChildren, OnDestroy, ElementRef, ViewChild, HostListener, QueryList, EventEmitter, Output } from '@angular/core';
import { BorderLayoutContainer } from '../border-layout-container/border-layout-container.component';
import { LayoutDragEvent, LayoutDragEventType, LayoutRegion, LayoutRegionType, SubscriptionService } from '../../../model';
import { BorderLayoutRenderer } from './util/border-layout-renderer';
import { IdentifiableComponent } from '../../../core';

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
export class BorderLayout extends IdentifiableComponent implements AfterViewInit, OnDestroy {

  /**
   * Emits events each time the user starts dragging a region handle.
   */
  @Output()
  public readonly dragStart: EventEmitter<LayoutDragEvent> = new EventEmitter(false);

  /**
   * Emits events each time the user stops dragging a region handle.
   */
  @Output()
  public readonly dragStop: EventEmitter<LayoutDragEvent> = new EventEmitter(false);

  /**
   * Emits events each time the user is dragging a region handle.
   */
  @Output()
  public readonly dragging: EventEmitter<LayoutDragEvent> = new EventEmitter(false);
  
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
  constructor(private subscribeSvc: SubscriptionService) {
    super();
    this.renderer = new BorderLayoutRenderer(subscribeSvc);
    subscribeSvc.register(this,
      this.renderer.userAction.subscribe((event: LayoutDragEvent)=> {
        event.layout = this;
        if (event.type === LayoutDragEventType.DRAGGING) {
          this.dragging.emit(event);
          return;
        }
        if (event.type === LayoutDragEventType.DRAG_START) {
          this.dragStart.emit(event);
          return;
        }
        this.dragStop.emit(event);
      })
    );
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
    this.subscribeSvc.clearAll(this);
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

  /**
   * Resizes the specified region.
   * 
   * @param region The region to resize.
   * @param size The new size of the region to resize.
   * 
   * @returns `true` whether the specified region has been resized; `false` otherwise.
   */
  public resizeRegion(region: LayoutRegion | LayoutRegionType, size: number): void {
    this.renderer.resizeRegion(region as LayoutRegion, size);
  }
}
