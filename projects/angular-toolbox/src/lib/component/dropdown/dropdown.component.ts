/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IdentifiableComponent } from '../../core';
import { DropdownEvent, DropdownEventType, DropdownHorizontalPosition, DropdownState, DropdownVerticalPosition } from '../../model';

/**
 * @private
 */
const API_MATCH: string = ':popover-open';

/**
 * This component is part of the LAF-less API.
 */
@Component({
  selector: 'atx-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent extends IdentifiableComponent {

  @Output()
  public readonly toggle: EventEmitter<DropdownEvent> = new EventEmitter();

  @Output()
  public readonly beforeToggle: EventEmitter<DropdownEvent> = new EventEmitter();

  @Input()
  public buttonClass!: string;

  @Input()
  public containerClass!: string;

  @Input()
  public vPos: DropdownVerticalPosition = "bottom";

  @Input()
  public hPos: DropdownHorizontalPosition = "left";

  /**
   * @private
   */
  protected id!: string;

  /**
   * @private
   */
  @ViewChild("popover")
  private _popover!: ElementRef;

  /**
   * @private
   */
  constructor() {
    super();
    this.id = this.getID().toString();
  }

  public hideContent(): void {
    if (!this._popover) return;
    this._popover.nativeElement.hidePopover();
  }

  public showContent(): void {
    if (!this._popover) return;
    this._popover.nativeElement.showPopover();
  }

  public isOpened(): boolean {
    if (!this._popover) return false;
    return this._popover.nativeElement.matches(API_MATCH);
  }

  /**
   * @private
   */
  protected onBeforeToggle(event: Event): void {
    this.beforeToggle.emit(
      this.buildEvent(event as ToggleEvent, DropdownEventType.BEFORE_TOGGLE)
    );
  }

  /**
   * @private
   */
  protected onToggle(event: Event): void {
    this.toggle.emit(
      this.buildEvent(event as ToggleEvent, DropdownEventType.TOGGLE)
    );
  }

  /**
   * @private
   */
  private buildEvent(event: ToggleEvent, type: DropdownEventType): DropdownEvent {
    return new DropdownEvent(this, type, event.newState as DropdownState, event.oldState as DropdownState);
  }
}
