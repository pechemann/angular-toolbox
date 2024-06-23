import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SafeHtmlPipe, SubscriptionService } from 'angular-toolbox';

const COMP_REF: string = "DocumentationComponent";

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [
    SafeHtmlPipe
  ],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent implements OnInit, OnDestroy {

  protected page!: string;

  constructor(breadcrumb: BreadcrumbService,
              private _http: HttpClient,
              private _subsciptionService: SubscriptionService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources", "resources"))
              .addItem(breadcrumb.buildItem("Documentation"));
  }

  public ngOnInit(): void {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url: string = 'http://localhost:4200/documentation/http-mocking-framework/index.html';
    this._subsciptionService.register(COMP_REF,
      this._http.get(url, { headers, responseType: 'text'}).subscribe(data => this.page = data)
    );
  }

  public ngOnDestroy(): void {
    this._subsciptionService.clearAll(COMP_REF);
  }
}
