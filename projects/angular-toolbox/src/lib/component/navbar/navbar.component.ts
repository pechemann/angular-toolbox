/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

/**
 * The `NavbarComponent` component is a horizontal menu. It can be used to show a list of navigation
 * links positioned on the top side of your page.
 */
@Component({
  selector: 'atx-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  /**
   * Emits a event each time the collapse state of the component changes in responsive mode.
   */
  @Output()
  public readonly stateChange: EventEmitter<boolean> = new EventEmitter();

  /**
   * A string that represents the aria label of the brand item.
   */
  @Input()
  public brandLabel!: string;

  /**
   * A string that represents the aria label of the button when the menu is expanded in responsive mode.
   */
  @Input()
  public set expandedLabel(value: string) {
    this.expLabel = value;
    this.setBtnLabel();
  }
  public get expandedLabel(): string {
    return this.expLabel;
  }

  /**
   * A string that represents the aria label of the button when the menu is collapsed in responsive mode.
   */
  @Input()
  public set collapsedLabel(value: string) {
    this.collLabel = value;
    this.setBtnLabel();
  }
  public get collapsedLabel(): string {
    return this.collLabel;
  }

  /**
   * @private
   */
  protected menuOpen: boolean = false;

  /**
   * @private
   */
  protected isResponsive: boolean = false;
  
  /**
   * @private
   */
  protected btnLabel!: string;

  /**
   * @private
   */
  protected collLabel!: string;
  
  /**
   * @private
   */
  protected expLabel!: string;

  /**
   * Forces the menu to open in responsive mode.
   */
  public open(): void {
    if (this.isResponsive === false) return;
    this.menuOpen = true;
    this.emitStateEvt();
  }

  /**
   * Forces the menu to close in responsive mode.
   */
  public close(): void {
    if (this.isResponsive === false) return;
    this.menuOpen = false;
    this.emitStateEvt();
  }
  
  /**
   * Returns a boolean that indicates whether the menu is currently in responsive mode (`true`),
   * or not (`false`).
   * 
   * @returns `true` whether the menu is in responsive mode; `false` otherwise.
   */
  public isResponsiveMode(): boolean {
    return this.isResponsive;
  }

  /**
   * Returns a boolean that indicates whether the menu is open in responsive mode (`true`),
   * or not (`false`).
   * 
   * @returns `true` whether the menu is open in responsive mode; `false` otherwise.
   */
  public isOpen(): boolean {
    return this.menuOpen;
  }

  /**
   * @private
   */
  public ngOnInit(): void {
    this.matchMedia();
  }

  /**
   * @private
   */
  protected onClick(): void {
    this.menuOpen = !this.menuOpen;
    this.emitStateEvt();
  }

  /**
   * @private
   */
  @HostListener('window:resize')
  protected onResize() {
    this.matchMedia();
  }

  /**
   * @private
   */
  private matchMedia(): void {
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (this.isResponsive === true) return;
      this.isResponsive = true;
      this.menuOpen = false;
      this.setBtnLabel();
    } else {
      if (this.isResponsive === false) return;
      this.isResponsive = this.menuOpen = false;
      this.setBtnLabel();
    }
  }

  /**
   * @private
   */
  private setBtnLabel(): void {
    this.btnLabel = this.menuOpen ? this.expLabel : this.collLabel;
  }

  /**
   * @private
   */
  private emitStateEvt(): void {
    this.stateChange.emit(this.menuOpen);
  }
}
