import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY_STRING, HttpMockService, SafeHtmlPipe, SubscriptionService, VersionService } from 'angular-toolbox';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { HighlightService } from '../../../ui/model/service/highlight.service';
import { IconListComponent } from '../../../ui/component/icon-list/icon-list.component';
import { IconListService } from '../../../model/service/icon-list-list.service';
import { HttpForwardProxy } from 'projects/angular-toolbox/src/lib/framework/mock/http/proxy';
import { DOCUMENTATION_PROXY_CONFIG } from '../../proxy/documentation-proxy.config';

@HttpForwardProxy(DOCUMENTATION_PROXY_CONFIG) 
@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [
    SafeHtmlPipe,
    IconListComponent
  ],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent implements OnInit, OnDestroy {

  protected page!: string;
  protected isHomePage: boolean = false;

  constructor(breadcrumb: BreadcrumbService,
              public versionService: VersionService,
              public iconListService: IconListService,
              private _httpMockService: HttpMockService,
              private _http: HttpClient,
              private _subsciptionService: SubscriptionService,
              private _route : ActivatedRoute,
              private _highlightService: HighlightService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources", "resources"))
              .addItem(breadcrumb.buildItem("Documentation"));
  }

  public ngOnInit(): void {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const origin: string = 'https://pascalechemann.com/angular-toolbox/documentation';
    this._subsciptionService.register(this,
      this._route.url.subscribe((segments: UrlSegment[])=> {
        const cursor: number = segments.length;
        if (cursor === 1) {
          this.isHomePage = true;
          return;
        }
        const path: string = segments.slice(1).join("/");
        const endpoint: string = `${origin}/${path}/${cursor === 2 ? "index" : EMPTY_STRING}.html`;
        this._subsciptionService.register(this,
          this._http.get(endpoint, { headers, responseType: 'text'}).subscribe(data => {
            this.page = data;
            this._highlightService.highlightAll();
          })
        )
      })
    );
  }

  public ngOnDestroy(): void {
    this._subsciptionService.clearAll(this);
  }
}
