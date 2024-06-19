import { Component } from '@angular/core';
import { CodeWrapper } from '../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HttpMockService } from 'projects/angular-toolbox/src/lib/service/http/mock/http-mock.service';
import { config } from './http-mock-config';

const realDataUri: string = 'https://etablissements-publics.api.gouv.fr/v3/departements/14/maison_handicapees';

@Component({
  selector: 'app-http-mock-service',
  templateUrl: './http-mock-service.component.html'
})
export class HttpMockServiceComponent {

  constructor(private _http: HttpClient,
              private _httpMockService: HttpMockService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("HTTP Mock Service"));
    this._httpMockService.setConfig(config);
  }

  public title: string = "HTTP Mock Service Demo";
  public presentation: string = "A lightweight service that provides Mocking strategies for developing HTTP-based components in your Angular projects.";
  public srcCode: CodeWrapper = {
    html: [``],
    ts: [
`/////////////////////////
// Application module
/////////////////////////

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: XhrFactory, useFactory: xhrProxyFactoryFunction },
    provideHttpClient(),
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularToolboxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}`
]
  };

  public loadData(): void {
    this._http.get("/test").subscribe((result: any)=> {
      console.log(result);
    });
  }
}
