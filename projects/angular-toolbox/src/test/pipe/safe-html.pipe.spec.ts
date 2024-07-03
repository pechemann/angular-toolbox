/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser'
import { SafeHtmlPipe } from '../../lib/pipe/safe/safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  const HTML: string = '<h1>My HTML String</h1>';

  beforeEach(() => {
    pipe = new SafeHtmlPipe(TestBed.inject(DomSanitizer));
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  
  it('transform() should return the correct HTML string', () => {
    const resultString = (pipe.transform(HTML) as any).changingThisBreaksApplicationSecurity;
    expect(resultString).toBe(HTML);
  });
});
