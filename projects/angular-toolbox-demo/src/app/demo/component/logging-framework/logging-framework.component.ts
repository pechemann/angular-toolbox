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
import { FormsModule } from '@angular/forms';

const CALLER: string = "Logging Console Demo";

@Component({
  selector: 'app-logging-framework-demo',
  standalone: true,
  imports: [
    DemoComponent,
    FormsModule
  ],
  templateUrl: './logging-framework.component.html',
  styleUrl: 'logging-framework.component.scss'
})
export class LoggingFrameworkComponent extends IdentifiableComponent implements AfterViewInit, OnDestroy {

  @ViewChild("consoleViewport")
  private _console!: ElementRef<HTMLDivElement>;

  constructor(breadcrumb: BreadcrumbService,
              protected logger: LoggerService) {
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
    if (type === "info") return this.logger.info(CALLER, "Log button click", metadata);
    if (type === "config") return this.logger.config(CALLER, "Log button click", metadata);
    if (type === "warn") return this.logger.warn(CALLER, "Warning button click");
    this.logger.error(CALLER, "Error button click");
  }

  protected copyLogs(): void {
    this.logger.getLogConnector().copyLogs();
  }

  protected clearLogs(): void {
    this.logger.getLogConnector().clearLogs();
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
    <label>Min level:</label>
    <select [(ngModel)]="logger.minLogLevel">
      <option value="0">INFO</option>
      <option value="1">CONFIG</option>
      <option value="2">WARNING</option>
      <option value="3">ERROR</option>
      <option value="4">OFF</option>
    </select>
    <button (click)="copyLogs()">Copy Logs</button>
    <button (click)="clearLogs()">Clear Logs</button>
  </header>
  <main #consoleViewport></main>
</section>`]
    ,
    typescript: [`@Component({
  selector: 'logging-console',
  standalone: true,
  templateUrl: './logging-console.component.html'
})
export class LoggingConsoleComponent implements AfterViewInit {

  @ViewChild("consoleViewport")
  private console!: ElementRef<HTMLDivElement>;
  private connector: any;
    
  constructor(protected logger: LoggerService) {}

  protected copyLogs(): void {
    this.connector.copyLogs();
  }

  protected clearLogs(): void {
    this.connector.clearLogs();
  }

  public ngAfterViewInit(): void {
    const connector: LogConnector = new HtmlLogConnector(this.console.nativeElement);
    this.logger.setLogConnector(connector);
    this.connector = connector;
  }
}`]
  };

  public ngAfterViewInit(): void {
    const logConnector: LogConnector = new HtmlLogConnector(this._console.nativeElement);
    this.logger.setLogConnector(logConnector);
  }

  public ngOnDestroy(): void {
    this.logger.setLogConnector(null);
    this.logger.getLogs().length = 0;
  }
}
