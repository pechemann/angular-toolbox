import { Component } from '@angular/core';

@Component({
  selector: 'atx-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  protected menuOpened: boolean = false;

  protected onClick(): void {
    this.menuOpened = !this.menuOpened;
  }
}
