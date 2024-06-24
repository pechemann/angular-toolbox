import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY_STRING, SafeHtmlPipe, SubscriptionService } from 'angular-toolbox';
import { ActivatedRoute, RouterModule, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [
    RouterModule,
    SafeHtmlPipe
  ],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent implements OnInit, OnDestroy {

  protected page!: string;
  protected isHomePage: boolean = false;

  constructor(breadcrumb: BreadcrumbService,
              private _http: HttpClient,
              private _subsciptionService: SubscriptionService,
              private _route : ActivatedRoute) {
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
          this.isHomePage = true;
          return;
        }
        const path: string = segments.slice(1).join("/");
        const endpoint: string = `${origin}/${path}/${cursor === 2 ? "index" : EMPTY_STRING}.html`;
        this._subsciptionService.append(
          this._http.get(endpoint, { headers, responseType: 'text'}).subscribe(data => this.page = data)
        )
      })
    );
  }

  public ngOnDestroy(): void {
    this._subsciptionService.clearAll(this);
  }
}
