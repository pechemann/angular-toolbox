import { Component, OnInit } from '@angular/core';
import { AngularToolboxIconListComponent, AngularToolboxPageTitleComponent, BreadcrumbService, IconListItem } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { IconListService } from '../../../ui/model/service/icon-list-list.service';
import { AngularToolboxLogoComponent } from 'projects/angular-toolbox/src/public-api';

@Component({
    selector: 'app-demo-home',
    imports: [
        AngularToolboxIconListComponent,
        AngularToolboxPageTitleComponent,
        AngularToolboxLogoComponent
    ],
    templateUrl: './demo-home.component.html',
    styleUrl: './demo-home.component.scss'
})
export class DemoHomeComponent implements OnInit {
  
  protected itemListCollection: IconListItem[][] = [];

  constructor(private _iconListService: IconListService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll().addItem(breadcrumb.buildItem("Demo"));
  }

  public ngOnInit(): void {
    const itemList: IconListItem[] = this._iconListService.getDemoList();
    while(itemList.length) {
      this.itemListCollection.push(itemList.splice(0,10));
    }
  }
}
