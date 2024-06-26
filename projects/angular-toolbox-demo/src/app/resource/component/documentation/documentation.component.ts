import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY_STRING, HttpMockService, SafeHtmlPipe, SubscriptionService, VersionService } from 'angular-toolbox';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { HighlightService } from '../../../ui/model/service/highlight.service';
import { IconListComponent } from '../../../ui/component/icon-list/icon-list.component';
import { IconListService } from '../../../model/service/icon-list-list.service';
import { HttpForwardProxy } from 'projects/angular-toolbox/src/lib/framework/mock/http/proxy';
import { DOCUMENTATION_PROXY_CONFIG } from '../../proxy/documentation-proxy.config';
import { BreadcrumbItem } from '../../../ui/model/business/breadcrumb-item';

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
  private _breadcrumbItemList: BreadcrumbItem[] = [ this._breadcrumb.buildItem("Resources", "resources") ];

  constructor(private _breadcrumb: BreadcrumbService,
              public versionService: VersionService,
              public iconListService: IconListService,
              private _httpMockService: HttpMockService,
              private _http: HttpClient,
              private _subsciptionService: SubscriptionService,
              private _route : ActivatedRoute,
              private _highlightService: HighlightService) {
    this._breadcrumb.removeAll();
  }

  public ngOnInit(): void {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const origin: string = 'https://pascalechemann.com/angular-toolbox/documentation';
    this._subsciptionService.register(this,
      this._route.url.subscribe((segments: UrlSegment[])=> {
        const cursor: number = segments.length;
        if (cursor === 1) {
          this.isHomePage = true;
          this._breadcrumbItemList.push(this._breadcrumb.buildItem("Documentation"));
          return;
        }
        this._breadcrumbItemList.push(this._breadcrumb.buildItem("Documentation", "resources/documentation"));
        const path: string = segments.slice(1).join("/");
        const endpoint: string = `${origin}/${path}/${cursor === 2 ? "index" : EMPTY_STRING}.html`;
        this._subsciptionService.register(this,
          this._http.get(endpoint, { headers, responseType: 'text'}).subscribe(data => {
            this.page = data;
            setTimeout(()=> {
              const titleElm: HTMLHeadingElement | null = document.querySelector("h2");
              this._highlightService.highlightAll();
              if (titleElm) this._breadcrumbItemList.push(this._breadcrumb.buildItem(titleElm.textContent as any));
              this._breadcrumbItemList.forEach(item=> this._breadcrumb.addItem(item));
            })
          })
        )
      })
    );
  }

  public ngOnDestroy(): void {
    this._subsciptionService.clearAll(this);
  }
}
