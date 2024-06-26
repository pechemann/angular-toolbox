import { Component, Inject } from '@angular/core';
import { BreadcrumbService } from '../ui/model/service/breadcrumb.service';
import { DarkModeService } from 'angular-toolbox';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public breadcrumb: BreadcrumbService,
              public darkModeService: DarkModeService,
              @Inject(DOCUMENT) document: Document,) {
    this.setDarkmodeState(darkModeService.darkModeEnabled(), document);
    darkModeService.change.subscribe((isDarkMode: boolean)=> this.setDarkmodeState(isDarkMode, document));
  }

  private setDarkmodeState(isDarkMode: boolean, document: Document): void {
     document.body.setAttribute("data-bs-theme", isDarkMode ? 'dark' : 'light')
  }
}
