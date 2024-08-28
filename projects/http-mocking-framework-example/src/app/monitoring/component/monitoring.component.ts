import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularToolboxPageTitleComponent, BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { HttpMock, HttpMockService, Log, AtxMonitoringConsoleComponent, SubscriptionService, IdentifiableComponent, AtxHttpMockConsoleService } from 'projects/angular-toolbox/src/public-api';
import { MONITORING_MOCK_CONFIG } from '../../mock/monitoring/http-mock-config';
import { MonitoringApi, MonitoringApiDescriptor } from '../../mock/monitoring/monitoring-api';
import { HttpClient } from '@angular/common/http';

declare type TabType = "inline" | "docked";

@HttpMock(MONITORING_MOCK_CONFIG)
@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [
    AngularToolboxPageTitleComponent,
    AtxMonitoringConsoleComponent
  ],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.scss'
})
export class MonitoringComponent extends IdentifiableComponent implements OnInit, OnDestroy {

  protected logList: Log[] = [];
  protected readonly apiConfig: MonitoringApi;
  protected selectedAction: MonitoringApiDescriptor | undefined;
  protected activeTab: TabType = "inline";

  constructor(breadcrumb: BreadcrumbService,
              private subscriptionService: SubscriptionService,
              httpClient: HttpClient,
              private mockService: HttpMockService,
              private console: AtxHttpMockConsoleService) {
    super();
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Monitoring Sample Application"));
    this.apiConfig = new MonitoringApi(httpClient);
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.subscriptionService.clearAll(this);
  }

  protected tabChange(type: TabType): void {
    if (type === "inline") this.console.close();
    this.activeTab = type;
  }

  protected openConsole(): void {
    this.console.open();
  }

  protected actionSelect(event: Event) {
    const selectedId: string = (event.target as HTMLSelectElement).value;
    this.selectedAction = this.apiConfig.API.find( cfg => cfg.id.toString() === selectedId);
  }

  protected sendHttpRequest(): void {
    if (!this.selectedAction) return;
    this.subscriptionService.register(this, this.selectedAction.invoker().subscribe());
  }

  protected sendRandomHttpRequests(): void {
    const apiConfig: MonitoringApiDescriptor[] = this.apiConfig.API;
    const len: number = apiConfig.length;
    let actionNum: number = 4;
    do {
      const descriptor: MonitoringApiDescriptor = apiConfig[(Math.random() * len) | 0];
      this.subscriptionService.register(this, descriptor.invoker().subscribe());
    } while (actionNum-- > 1);
  }
}
