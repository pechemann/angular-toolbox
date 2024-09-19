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

  protected id!: string;

  private _opened: boolean = false;

  @ViewChild("popover")
  private _popover!: ElementRef;

  constructor() {
    super();
    this.id = this.getID().toString();
  }

  public hideContent(): void {
    if (!this._popover) return;
    this.hidePopover();
    this._opened = false;
  }

  public showContent(): void {
    if (!this._popover) return;
    this.showPopover();
    this._opened = true;
  }

  public toggleContent(): void {
    if (!this._popover) return;
    this.toggleState();
    if (this._opened) return this.showPopover();
    this.hidePopover();
  }

  protected btnClick(): void {
    this.toggleState();
  }

  protected onBeforeToggle(event: Event): void {
    this.beforeToggle.emit(
      this.buildEvent(event as ToggleEvent, DropdownEventType.BEFORE_TOGGLE)
    );
  }

  protected onToggle(event: Event): void {
    this.toggle.emit(
      this.buildEvent(event as ToggleEvent, DropdownEventType.TOGGLE)
    );
  }

  private buildEvent(event: ToggleEvent, type: DropdownEventType): DropdownEvent {
    return new DropdownEvent(this, type, event.newState as DropdownState, event.oldState as DropdownState);
  }

  private showPopover(): void {
    this._popover.nativeElement.showPopover();
  }

  private hidePopover(): void {
    this._popover.nativeElement.hidePopover();
  }

  private toggleState(): void {
    this._opened = !this._opened;
  }
}
