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
export class AtxResponsePreviewRendererComponent implements OnDestroy {

  protected json: any = null;
  protected text: string | null = null;
  protected response: any = null;
  protected imgUrl: string | null = null;
  protected trustUrl: SafeUrl | null = null;
  protected resourceName!: string;

  
  @Input()
  public set data (value: HttpResponse<any>) {
    const body: any = value.body;
    this.revokeObjectURL();
    this.response = value;
    this.json = this.text = this.imgUrl = this.trustUrl = null;
    if (body) {
      const bodyType: ConsoleBodyType = DataUtil.getBodyType(body);
      if (bodyType === ConsoleBodyType.TEXT) this.text = body;
      else if (bodyType === ConsoleBodyType.JSON) this.json = body;
      else if (bodyType === ConsoleBodyType.BLOB) {
        if (body.type.startsWith(IMG_TYPE) ||
        body.type.startsWith(SVG_TYPE)) {
              this.resourceName = UrlUtil.getResourceNameFromPath((value as any).url);
              const url: string = URL.createObjectURL(body);
              this.imgUrl = url;
              this.trustUrl = this.sanitizer.bypassSecurityTrustUrl(url);
            }
      }
    }
    this._cdr.detectChanges();
  }

  constructor(private _cdr: ChangeDetectorRef,
              private sanitizer: DomSanitizer) {}

  public ngOnDestroy(): void {
    this.revokeObjectURL();
    this.json = this.text = this.imgUrl = this.trustUrl = null;
  }

  protected revokeObjectURL(): void {
    if (this.imgUrl) URL.revokeObjectURL(this.imgUrl);
  }
}
