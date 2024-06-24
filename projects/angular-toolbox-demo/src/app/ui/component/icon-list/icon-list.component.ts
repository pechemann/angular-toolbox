import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconListItem } from '../../model/business/icon-list-item';

@Component({
  selector: 'icon-list',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './icon-list.component.html',
  styleUrl: './icon-list.component.scss'
})
export class IconListComponent {

  @Input()
  public itemList!: IconListItem[];
}
