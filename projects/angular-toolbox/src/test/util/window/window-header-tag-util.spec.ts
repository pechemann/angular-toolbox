/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { WindowHeaderTagUtil } from "projects/angular-toolbox/src/lib/util/window/window-header-tag-util";

describe('WindowHeaderTagUtil', () => {
  
  const buildWindow = ()=> { return {
      document: {
        getElementsByTagName: ()=> undefined,
        createElement: ()=> undefined
      }
    }
  };

  it('setTitle() should do nothing when the init parameter is not defined', () => {
    const window: any = buildWindow();
    WindowHeaderTagUtil.setTitle(window);
    expect(window.document.title).toBeUndefined();
  });

  it('setTitle() should set the title property', () => {
    const window: any = buildWindow();
    WindowHeaderTagUtil.setTitle(window, { title: "foo" });
    expect(window.document.title).toEqual("foo");
  });

  it('setIcon() should do nothing when the init parameter is not defined', () => {
    const window: any = buildWindow();
    WindowHeaderTagUtil.setIcon(window);
    spyOn(window.document, "getElementsByTagName");
    spyOn(window.document, "createElement");
    expect(window.document.getElementsByTagName).not.toHaveBeenCalled();
    expect(window.document.createElement).not.toHaveBeenCalled();
  });

  it('setIcon() should create an icon link', () => {
    const window: any = buildWindow();
    const head =  [document.getElementsByTagName('head')[0]];
    const link: HTMLLinkElement = document.createElement('link');
    const init = { icon: "http://www.foo.com/icon" };
    spyOn(window.document, "getElementsByTagName").and.returnValue(head);
    spyOn(window.document, "createElement").and.returnValue(link);
    spyOn(head[0], "appendChild");
    WindowHeaderTagUtil.setIcon(window, init);
    expect(window.document.getElementsByTagName).toHaveBeenCalledWith('head');
    expect(window.document.createElement).toHaveBeenCalledWith('link');
    expect(head[0].appendChild).toHaveBeenCalledWith(link);
    expect(link.rel).toEqual('shortcut icon');
    expect(link.href).toEqual(init.icon);
  });

});