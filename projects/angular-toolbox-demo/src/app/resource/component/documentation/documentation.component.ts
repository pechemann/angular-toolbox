/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpMockService, SafeHtmlPipe, SubscriptionService, VersionService, AppBrigeService, AbstractIdentifiable } from 'angular-toolbox';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { IconListService } from '../../../ui/model/service/icon-list-list.service';
import { HttpMock } from 'projects/angular-toolbox/src/lib/framework/mock/http/proxy';
import { DOCUMENTATION_PROXY_CONFIG } from '../../proxy/documentation-proxy.config';
import { DocumentationMenu } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService, HighlightService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';
import { BreadcrumbItem, IconListItem } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/business';
import { AngularToolboxHrComponent, AngularToolboxIconListComponent, AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@HttpMock(DOCUMENTATION_PROXY_CONFIG) 
@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [
    SafeHtmlPipe,
    AngularToolboxIconListComponent,
    AngularToolboxPageTitleComponent,
    AngularToolboxHrComponent
  ],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent extends AbstractIdentifiable implements OnInit, OnDestroy {

  protected page!: string;
  protected isHomePage: boolean = false;
  protected itemListCollection: IconListItem[][] = [];
  protected articles!: IconListItem[];

  constructor(public versionService: VersionService,
              //--> HttpMockService is declared only for @HttpForwardProxy reference:
              private _httpMockService: HttpMockService,
              private _breadcrumb: BreadcrumbService,
              private _http: HttpClient,
              private _subsciptionService: SubscriptionService,
              private _route : ActivatedRoute,
              private _highlightService: HighlightService,
              private _appBridgService: AppBrigeService,
              private _iconListService: IconListService) {
    super();
  }

  public ngOnInit(): void {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const origin: string = 'https://pascalechemann.com/angular-toolbox/documentation';
    this._subsciptionService.register(this,
      this._route.url.subscribe((segments: UrlSegment[])=> {
        const cursor: number = segments.length;
        setTimeout(()=> {
          this._breadcrumb.removeAll().addItem(this._breadcrumb.buildItem("Resources", "resources"));
        });
        if (cursor === 1) {
          this._subsciptionService.register(this,
            this._iconListService.getDocumentationList().subscribe((result: DocumentationMenu)=> {
              const doc: any[] = result.documentation;
              while(doc.length) {
                this.itemListCollection.push(doc.splice(0,10));
              }
              this.articles = result.articles;
            })
          );
          this.isHomePage = true;
          setTimeout(()=> {
            this._breadcrumb.addItem(
              this._breadcrumb.buildItem("Documentation")
            )
          });
          return;
        }
        const path: string = segments.slice(1).join("/");
        let endpoint: string;
        if (cursor === 2) endpoint = `${origin}/${path}/index.html`;
        else endpoint = `${origin}/${path}.html`;
        this._subsciptionService.register(this,
          this._http.get(endpoint, { headers, responseType: 'text'}).subscribe(data => {
            this.page = data;
            setTimeout(()=> {
              this._highlightService.highlightAll();
              this.builBbreadcrumb();
            })
          })
        );
      })
    );
    this._appBridgService.declareCommand(
      "showVersion",
      ()=> window.alert(`Current Angular Toolbox is: ${this.versionService.getVersion().toString()}`)
    );
  }

  public ngOnDestroy(): void {
    this._appBridgService.deleteCommand("showVersion");
    this._subsciptionService.clearAll(this);
  }

  private builBbreadcrumb(): void {
    const rootPath: string = "resources/documentation";
    const breadcrumbItemList: BreadcrumbItem[] = [
      this._breadcrumb.buildItem("Documentation", rootPath)
    ];
    const navigationTree: HTMLObjectElement | null = document.querySelector("#navigation-tree");
    if (navigationTree && navigationTree?.dataset["tree"]) {
      const dataSet: any[] = eval(navigationTree.dataset["tree"]);
      dataSet.forEach((item)=> {
        const itemPath: string = item.path;
        const path: string | undefined = itemPath ? `${rootPath}/${itemPath}` : undefined;
        breadcrumbItemList.push(this._breadcrumb.buildItem(item.label, path))
      });
    }
    breadcrumbItemList.forEach(item=> this._breadcrumb.addItem(item));
  }
}
