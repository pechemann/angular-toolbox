/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpMockRequestMetadata, Log } from '../../../../../model';
import { NgStyle } from '@angular/common';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { AtxJsonViewerComponent } from '../renderer/json-viewer/json-viewer.component';
import { AtxPayloadRendererComponent } from '../renderer/payload-renderer/payload-renderer.component';
import { AtxTimingRendererComponent } from '../renderer/timing-renderer/timing-renderer.component';

@Component({
  selector: 'atx-monitoring-console-details',
  standalone: true,
  imports: [
    NgStyle,
    AtxJsonViewerComponent,
    AtxPayloadRendererComponent,
    AtxTimingRendererComponent
  ],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxRequestDetailsComponent {

  @Output()
  public readonly close: EventEmitter<void> = new EventEmitter(true);

  protected currLog: Log | null = null;
  protected hasPayload: boolean = false;
  protected request!: HttpRequest<any>;
  protected response!: HttpResponse<any>;
  protected requestMetadata!: HttpMockRequestMetadata;
  protected bodyType:any = null;

  @Input()
  public set log(value: Log | null) {
    this.currLog = value
    if (value) {
      const metadata: any = value.metadata; 
      this.request = metadata.request;
      this.response = metadata.response;
      this.requestMetadata = metadata.requestMetadata;
      this.checkPayload();
      this._cdr.detectChanges();
      console.log(typeof this.response.body)
      return;
    }
    this.hasPayload = false;
    this.request = null as any;
    this.response = null as any;
    this.requestMetadata = null as any;
    this._cdr.detectChanges();
  }

  protected currSection: number = 0;

  constructor(private _cdr: ChangeDetectorRef) {}

  protected changeSection(idx: number): void {
    this.currSection = idx;
  }

  protected stringify(obj: any): string {
    return JSON.stringify(obj);
  };

  private checkPayload(): void {
    this.hasPayload = (this.request.params.keys().length > 0 || this.request.body !== null);
  }
}
