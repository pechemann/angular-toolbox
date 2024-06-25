import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY_STRING, SafeHtmlPipe, SubscriptionService, VersionService } from 'angular-toolbox';
import { ActivatedRoute, RouterModule, UrlSegment } from '@angular/router';
import { HighlightService } from '../../../ui/model/service/highlight.service';
import { IconListItem } from '../../../ui/model/business/icon-list-item';
import { IconListComponent } from '../../../ui/component/icon-list/icon-list.component';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [
    RouterModule,
    SafeHtmlPipe,
    IconListComponent
  ],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent implements OnInit, OnDestroy {

  protected page!: string;
  protected isHomePage: boolean = false;

  
  protected documentationList!: IconListItem[];

  constructor(breadcrumb: BreadcrumbService,
              public versionService: VersionService,
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
    const origin: string = 'http://localhost:4200/documentation';
    this._subsciptionService.register(this,
      this._route.url.subscribe((segments: UrlSegment[])=> {
        const cursor: number = segments.length;
        if (cursor === 1) {
          this.initDocumentationList();
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

  private initDocumentationList(): void {
    this.documentationList = [
      { label: "Quick Start Guide",  urlTree: ['/resources', 'documentation', 'quick-start-guide'] },
      { label: "HTTP Mocking Framework",  urlTree: ['/resources', 'documentation', 'http-mocking-framework'] },
      { label: "Subscription Service",  urlTree: ['/resources', 'documentation'] },
      { label: "Dark Mode Service",  urlTree: ['/resources', 'documentation'] },
      { label: "ButtonRole Directive",  urlTree: ['/resources', 'documentation'] },
      { label: "Version Service",  urlTree: ['/resources', 'documentation'] },
      { label: "Scroll Service",  urlTree: ['/resources', 'documentation'] }
    ];
  }
}
