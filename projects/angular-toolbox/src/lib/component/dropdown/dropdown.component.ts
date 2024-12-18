/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IdentifiableComponent } from '../../core';
import { DropdownEvent, DropdownEventType, DropdownHorizontalPosition, DropdownState, DropdownVerticalPosition, PopoverState } from '../../model';

/**
 * @private
 */
const API_MATCH: string = ':popover-open';

/**
 * The ATX dropdown component allows to create popup containers that are displayed by clicking on a button.
 * The content of the container is defined by Developer.
 * This component is part of the LAF-less API.
 */
@Component({
  selector: 'atx-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent extends IdentifiableComponent {

  /**
   * An event fired on the dropdown component just after it is shown or hidden.
   */
  @Output()
  public readonly toggle: EventEmitter<DropdownEvent> = new EventEmitter();

  /**
   * An event fired on the dropdown component just before it is shown or hidden.
   */
  @Output()
  public readonly beforeToggle: EventEmitter<DropdownEvent> = new EventEmitter();

  /**
   * Sets the dropdown button CSS class.
   */
  @Input()
  public buttonClass!: string;

  /**
   * Sets the dropdown conpoment CSS class.
   */
  @Input()
  public containerClass!: string;

  /**
   * Sets the vertical position of the content container.
   */
  @Input()
  public vPos: DropdownVerticalPosition = "bottom";

  /**
   * Sets the horizontal position of the content container.
   */
  @Input()
  public hPos: DropdownHorizontalPosition = "left";
  
  /**
   * Indicates whether the content container can be "light dismissed" by selecting outside the popover area
   * (`auto`), or not (`manual`).
   */
  @Input()
  public popoverState: PopoverState = "auto";

  /**
   * The disabled property sets or returns whether a dropdown is disabled, or not.
   */
  @Input()
  public set disabled(value: boolean) {
    this._disabled = this._button.nativeElement.disabled = value;
    if (!value) return;
    this.hideContent();
  }
  public get disabled(): boolean {
    return this._disabled;
  }
  
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
  @ViewChild("button")
  private _button!: ElementRef;

  /**
   * @private
   */
  private _disabled: boolean = false;

  /**
   * @private
   */
  constructor() {
    super();
    this.id = this.getID().toString();
  }

  /**
   * Hides the dropdown container.
   */
  public hideContent(): void {
    if (!this._popover) return;
    this._popover.nativeElement.hidePopover();
  }

  /**
   * Displays the dropdown container.
   */
  public showContent(): void {
    if (!this._popover || this._disabled) return;
    this._popover.nativeElement.showPopover();
  }

  /**
   * Returns the display state of the dropdown.
   * 
   * @returns Returns `true` whether the dropdown is opened; `false` otherwise.
   */
  public isOpen(): boolean {
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
