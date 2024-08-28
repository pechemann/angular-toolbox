/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { AtxJsonViewerComponent } from '../json-viewer/json-viewer.component';
import { DataUtil } from '../../../util/data.util';
import { ConsoleBodyType } from '../../../util/console-body-type';
import { SafeHtmlPipe } from '../../../../../../pipe';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';
import { UrlUtil } from '../../../util/url.util';
import { AtxLogRendererBase } from '../../abstract/log-renderer-base';
import { HttpMockLoggingMetadata, Log } from 'projects/angular-toolbox/src/public-api';

const IMG_TYPE: string = 'image/';
const SVG_TYPE: string = 'svg/';

@Component({
  selector: 'atx-response-preview-renderer',
  standalone: true,
  imports: [
    AtxJsonViewerComponent,
    SafeHtmlPipe
  ],
  templateUrl: './response-preview-renderer.component.html',
  styleUrl: './response-preview-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxResponsePreviewRendererComponent extends AtxLogRendererBase implements OnDestroy {

  protected json: any = null;
  protected text: string | null = null;
  protected response: any = null;
  protected imgUrl: string | null = null;
  protected trustUrl: SafeUrl | null = null;
  protected resourceName!: string;
  
  @Input()
  public override set log(value: Log | null) {
    super.log = value;
    this.ngOnDestroy();
    if (!value) return;
    const metadata: HttpMockLoggingMetadata = value.metadata; 
    const response: HttpResponse<any> =  metadata.response;
    if (!response) return
    const body: any = response.body;
    this.response = value;
    this.json = this.text = this.imgUrl = this.trustUrl = null;
    if (!body) return;
    const bodyType: ConsoleBodyType = DataUtil.getBodyType(body);
    if (bodyType === ConsoleBodyType.TEXT) {
      this.text = body;
      return;
    }
    if (bodyType === ConsoleBodyType.JSON) {
      this.json = body;
      return;
    }
    if (bodyType === ConsoleBodyType.BLOB) {
      const type = body.type;
      if (type.startsWith(IMG_TYPE) || type.startsWith(SVG_TYPE)) {
        this.resourceName = UrlUtil.getResourceNameFromPath((response as any).url);
        const url: string = URL.createObjectURL(body);
        this.imgUrl = url;
        this.trustUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      }
    }
  }

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  public ngOnDestroy(): void {
    this.revokeObjectURL();
    this.json = this.text = this.json = this.response = this.imgUrl = this.trustUrl = null;
  }

  protected revokeObjectURL(): void {
    if (this.imgUrl) URL.revokeObjectURL(this.imgUrl);
  }
}
