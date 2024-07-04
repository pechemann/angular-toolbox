/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { DarkModeService } from 'projects/angular-toolbox/src/public-api';

const LIGHT: string = 'light';
const DARK: string = 'dark';
const BS_ATTRIBUTE: string = 'data-bs-theme';

@Component({
  selector: 'atx-dark-mode',
  standalone: true,
  providers: [ DarkModeService ],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss'
})
export class AngularToolboxDarkModeComponent {

  protected theme: string = LIGHT;

  @ViewChild("dakModeMenu")
  private dakModeMenu!: any;

  constructor(public darkModeService: DarkModeService,
              @Inject(DOCUMENT) document: Document) {
    this.setDarkmodeState(darkModeService.darkModeEnabled(), document);
    darkModeService.change.subscribe((isDarkMode: boolean)=> this.setDarkmodeState(isDarkMode, document));
  }

  protected darkModeSelect(event: MouseEvent, mode: string): void {
    event.stopPropagation();
    mode === LIGHT ? this.darkModeService.disableDarkMode() : this.darkModeService.enableDarkMode();
    this.theme = mode;
    this.dakModeMenu.nativeElement.open = false;
  }

  private setDarkmodeState(isDarkMode: boolean, document: Document): void {
    this.theme = isDarkMode ? DARK : LIGHT;
    document.body.setAttribute(BS_ATTRIBUTE, this.theme);
  }
}
