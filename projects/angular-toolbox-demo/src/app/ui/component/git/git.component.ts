import { Component } from '@angular/core';
import { NavigateToUrlDirective } from 'angular-toolbox';

@Component({
  selector: 'git-btn',
  standalone: true,
  imports: [
    NavigateToUrlDirective
  ],
  templateUrl: './git.component.html',
  styleUrl: './git.component.scss'
})
export class GitComponent {
  
  protected readonly gitRef: string = "https://github.com/pechemann/angular-toolbox";
}
