import { Component } from '@angular/core';
import { NavigateToUrlDirective } from 'angular-toolbox';

@Component({
  selector: 'git-section',
  standalone: true,
  imports: [
    NavigateToUrlDirective
  ],
  templateUrl: './git-section.component.html',
  styleUrl: './git-section.component.scss'
})
export class GitSectionComponent {
  
  protected readonly gitRef: string = "https://github.com/pechemann/angular-toolbox";
}
