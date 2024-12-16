/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, HostListener, Input, OnInit } from '@angular/core';
import { EMPTY_STRING } from '../../util';

@Component({
  selector: 'atx-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',

})
export class NavbarComponent implements OnInit {

  @Input()
  public brandLabel: string = EMPTY_STRING;

  @Input()
  public expandedLabel: string = EMPTY_STRING;

  @Input()
  public collapsedLabel: string = EMPTY_STRING;

  /**
   * @private
   */
  protected menuOpened: boolean = false;

  /**
   * @private
   */
  protected isResponsive: boolean = false;
  
  /**
   * @private
   */
  protected btnLabel: string = EMPTY_STRING;

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
    this.menuOpened = !this.menuOpened;
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
      this.menuOpened = false;
      this.setBtnLabel();
    } else {
      if (this.isResponsive === false) return;
      this.isResponsive = false;
    }
  }

  /**
   * @private
   */
  private setBtnLabel(): void {
    this.btnLabel = this.menuOpened ? this.expandedLabel : this.collapsedLabel;
  }
}
