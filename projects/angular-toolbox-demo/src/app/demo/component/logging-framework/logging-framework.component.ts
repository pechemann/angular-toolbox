/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { HtmlLogConnector, LogConnector, LoggerService, IdentifiableComponent } from 'projects/angular-toolbox/src/public-api';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

const CALLER: string = "Logging Console Demo";

@Component({
  selector: 'app-logging-framework-demo',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './logging-framework.component.html',
  styleUrl: 'logging-framework.component.scss'
})
export class LoggingFrameworkComponent extends IdentifiableComponent implements AfterViewInit, OnDestroy {

  @ViewChild("consoleViewport")
  private _console!: ElementRef<HTMLDivElement>;

  constructor(breadcrumb: BreadcrumbService,
              private _loggingService: LoggerService) {
    super();
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
              .addItem(breadcrumb.buildItem("Logging Framework"));
  }

  protected logIndex: number = 0;

  protected sendLog(type: string): void {
    const metadata: any = {
      logIndex: ++this.logIndex,
      customId: crypto.randomUUID()
    };
    if (type === "info") return this._loggingService.info(CALLER, "Log button click", metadata);
    if (type === "config") return this._loggingService.config(CALLER, "Log button click", metadata);
    if (type === "warn") return this._loggingService.warn(CALLER, "Warning button click");
    this._loggingService.error(CALLER, "Error button click");
  }

  protected copyLogs(): void {
    this._loggingService.getLogConnector().copyLogs();
  }

  protected documentation: DocumentationLink = {
    label: "Logging Framework",
    commands: ['/resources', 'documentation', 'logging-framework']
  };
  protected title: string = "Logging Framework Demo";
  protected presentation: string = "A lightweight, but powerful and flexible, framework for managing app logs.";
  protected srcCode: CodeWrapper = {
    html: [`<section>
  <header>
    <h6>Console</h6>
    <button (click)="copyLogs()">Copy Logs</button>
  </header>
  <main #consoleViewport></main>
</section>`]
    ,
    typescript: [`export class LoggingConsoleComponent implements AfterViewInit, OnDestroy {

  @ViewChild("consoleViewport")
  private console!: ElementRef<HTMLDivElement>;
    
  constructor(private logger: LoggerService) {}

  protected copyLogs(): void {
    this.logger.getLogConnector().copyLogs();
  }

  public ngAfterViewInit(): void {
    const connector: LogConnector = new HtmlLogConnector(this.console.nativeElement);
    this.logger.setLogConnector(connector);
  }

  public ngOnDestroy(): void {
    this.logger.setLogConnector(null);
  }
}`]
  };

  public ngAfterViewInit(): void {
    const logConnector: LogConnector = new HtmlLogConnector(this._console.nativeElement);
    this._loggingService.setLogConnector(logConnector);
  }

  public ngOnDestroy(): void {
    this._loggingService.setLogConnector(null);
    this._loggingService.getLogs().length = 0;
  }
}
