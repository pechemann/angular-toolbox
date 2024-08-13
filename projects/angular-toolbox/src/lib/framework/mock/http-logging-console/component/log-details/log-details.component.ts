/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from '../../../../../model';
import { NgStyle } from '@angular/common';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'atx-logging-console-details',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './log-details.component.html',
  styleUrl: './log-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxLogDetailsComponent {

  @Output()
  public readonly close: EventEmitter<void> = new EventEmitter(true);

  protected hasLog: boolean = false;
  protected hasPayload: boolean = false;
  protected request!: HttpRequest<any>;
  protected response!: HttpResponse<any>;

  @Input()
  public set log(value: Log | null) {
    if (value) {
      const metadata: any = value.metadata; 
      this.hasLog = true;
      this.request = metadata.request;
      this.response = metadata.response;
      this.hasPayload = (this.request.params.keys().length > 0 || this.request.body !== null);
      return;
    }
    this.hasLog = this.hasPayload = false;
    this.request = null as any;
    this.response = null as any;
  }

  protected currSection: number = 0;

  protected changeSection(idx: number): void {
    this.currSection = idx;
  }

  protected stringify(obj: any): string {
    return JSON.stringify(obj);
  };
}
