/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component, Inject, ViewChild } from '@angular/core';
import { BreadcrumbService } from '../ui/model/service/breadcrumb.service';
import { DarkModeService } from 'angular-toolbox';
import { DOCUMENT } from '@angular/common';

const LIGHT: string = 'light';
const DARK: string = 'dark';
const BS_ATTRIBUTE: string = 'data-bs-theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected theme: string = LIGHT;

  @ViewChild("dakModeMenu")
  private dakModeMenu!: any;

  constructor(public breadcrumb: BreadcrumbService,
              public darkModeService: DarkModeService,
              @Inject(DOCUMENT) document: Document,) {
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
