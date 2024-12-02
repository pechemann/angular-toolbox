/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogOutletEvent } from './dialog-outlet.event';
import { DialogOutletEventType } from './dialog-outlet-event-type';
import { DialogConfig } from './dialog.config';
import { DEFAULT_CONFIG } from './dialog-default-config';
import { DialogBackdropType } from './dialog-backdrop-type.enum';

/**
 * 
 */
@Component({
  selector: 'atx-dialog-outlet',
  standalone: true,
  template: '<dialog #dialog (mouseup)="mouseupHandler($event)" (close)="onClose($event)"><ng-container #renderer></ng-container></dialog>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogOutlet implements OnInit {

  /**
   * @private
   */
  @ViewChild("dialog")
  private _dialog!: ElementRef<HTMLDialogElement>;

  /**
   * @private
   */
  @ViewChild("renderer", { static: true, read: ViewContainerRef })
  private renderer!: ViewContainerRef;

  /**
   * @private
   */
  private _config!: DialogConfig;

  /**
   * @private
   */
  constructor(private dialogSvc: DialogService) {}

  /**
   * @private
   */
  public ngOnInit(): void {
    this.dialogSvc.__init__(this.renderer);
    this.dialogSvc.dialogStateChange.subscribe((event: DialogOutletEvent)=> this.stateChange(event));
  }

  /**
   * @private
   */
  protected mouseupHandler(event: MouseEvent): void {
    if (this._config.backdrop !== DialogBackdropType.MODAL) return;
    const rect: DOMRect = this._dialog.nativeElement.getBoundingClientRect();
    const xPos: number = event.clientX;
    const yPos: number = event.clientY;
    const top: number = rect.top;
    const left: number = rect.left;
    const isDialog: boolean = (top <= yPos && yPos <= top + rect.height && left <= xPos && xPos <= left + rect.width);
    if (!isDialog) this.hide();
  }

  /**
   * @private
   */
  protected onClose(event: Event): void {
    this.renderer.clear();
  }

  /**
   * @private
   */
  private stateChange(event: DialogOutletEvent): void {
    const state: DialogOutletEventType = event.state;
    if (state === DialogOutletEvent.SHOW) return this.show(event);
    if (state === DialogOutletEvent.HIDE) this.hide();
  }

  /**
   * @private
   */
  private show(event: DialogOutletEvent): void {
    this._config = event.config || DEFAULT_CONFIG;
    this._dialog.nativeElement.showModal();
  }

  /**
   * @private
   */
  private hide(): void {
    this._dialog.nativeElement.close();
  }
}
