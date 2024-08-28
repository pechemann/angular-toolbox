/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxLogRendererBase } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/abstract/log-renderer-base';

describe('AtxRequestDetailsComponent: no log specified', () => {
  let componentBase: AtxLogRendererBase;

  beforeEach(() => {
    componentBase = new AtxLogRendererBase();
  });

  it('the log property should be null by default', () => {
    expect(componentBase.log).toBeNull();
  });
});
