import { Component } from '@angular/core';
import { NavigateToUrlDirective } from 'angular-toolbox';
import { CodeViewportComponent } from '../code-viewport/code-viewport.component';

@Component({
  selector: 'git-section',
  standalone: true,
  imports: [
    NavigateToUrlDirective,
    CodeViewportComponent
  ],
  templateUrl: './git-section.component.html',
  styleUrl: './git-section.component.scss'
})
export class GitSectionComponent {
  
  protected readonly gitRef: string = "https://github.com/pechemann/angular-toolbox";
}
