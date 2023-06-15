import { Component } from '@angular/core';
import { DarkModeService } from 'angular-toolbox';
import { CodeWrapper } from '../../ui/model/code-wrapper';

@Component({
  selector: 'app-dark-mode-service',
  templateUrl: './dark-mode-service.component.html',
  styleUrls: ['./dark-mode-service.component.scss']
})
export class DarkModeServiceComponent {

  constructor(public darkModeService: DarkModeService) {}

  public srcCode: CodeWrapper = {
    html: `<button (click)="darkModeService.toggleDarkMode()"> Toggle Dark Mode </button>`,
    css: `.dark-mode {
    background: #333;
    color: #fff;
}`,
    ts: `export class DarkModeServiceComponent {
    constructor(public darkModeService: DarkModeService) {}
}`
  };
}
