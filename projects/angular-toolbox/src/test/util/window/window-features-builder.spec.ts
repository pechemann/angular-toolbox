/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BrowserWindowFeaturesBuilder } from "projects/angular-toolbox/src/lib/util/window/window-features-builder";
import { EMPTY_STRING, WindowFeatureState, WindowInit } from "projects/angular-toolbox/src/public-api";

describe('BrowserWindowFeaturesBuilder', () => {
  
  const init: WindowInit = {};

  it('build() should return the default string when the init parameter is not defined', () => {
    expect(BrowserWindowFeaturesBuilder.build()).toEqual('popup=true,left=100,top=100,width=800,height=450');
  });
  
  it('build() should set the popup parmeter to true', () => {
    expect(BrowserWindowFeaturesBuilder.build(init).startsWith('popup=true')).toBeTrue();
  });

  it('build() should invoke the BrowserWindowFeaturesBuilder.getTop() method', () => {
    spyOn(BrowserWindowFeaturesBuilder, "getTop");
    BrowserWindowFeaturesBuilder.build(init)
    expect(BrowserWindowFeaturesBuilder.getTop).toHaveBeenCalledWith(init);
  });

  it('build() should invoke the BrowserWindowFeaturesBuilder.getWidth() method', () => {
    spyOn(BrowserWindowFeaturesBuilder, "getWidth");
    BrowserWindowFeaturesBuilder.build(init)
    expect(BrowserWindowFeaturesBuilder.getWidth).toHaveBeenCalledWith(init);
  });

  it('build() should invoke the BrowserWindowFeaturesBuilder.getHeight() method', () => {
    spyOn(BrowserWindowFeaturesBuilder, "getHeight");
    BrowserWindowFeaturesBuilder.build(init)
    expect(BrowserWindowFeaturesBuilder.getHeight).toHaveBeenCalledWith(init);
  });

  it('build() should invoke the BrowserWindowFeaturesBuilder.getPopupProp() method', () => {
    spyOn(BrowserWindowFeaturesBuilder, "getPopupProp");
    BrowserWindowFeaturesBuilder.build(init)
    expect(BrowserWindowFeaturesBuilder.getPopupProp).toHaveBeenCalledWith("directories", init);
    expect(BrowserWindowFeaturesBuilder.getPopupProp).toHaveBeenCalledWith("titlebar", init);
    expect(BrowserWindowFeaturesBuilder.getPopupProp).toHaveBeenCalledWith("scrollbars", init);
    expect(BrowserWindowFeaturesBuilder.getPopupProp).toHaveBeenCalledWith("toolbar", init);
    expect(BrowserWindowFeaturesBuilder.getPopupProp).toHaveBeenCalledWith("location", init);
    expect(BrowserWindowFeaturesBuilder.getPopupProp).toHaveBeenCalledWith("status", init);
    expect(BrowserWindowFeaturesBuilder.getPopupProp).toHaveBeenCalledWith("menubar", init);
  });

  it('getTop() should return the default string when the init parameter is not defined', () => {
    expect(BrowserWindowFeaturesBuilder.getTop()).toEqual(',top=100');
  });
  
  it('getTop() should return a string with the specified top value', () => {
    expect(BrowserWindowFeaturesBuilder.getTop({ top: 300 })).toEqual(',top=300');
  });

  it('getLeft() should return the default string when the init parameter is not defined', () => {
    expect(BrowserWindowFeaturesBuilder.getLeft()).toEqual(',left=100');
  });
  
  it('getLeft() should return a string with the specified left value', () => {
    expect(BrowserWindowFeaturesBuilder.getLeft({ left: 300 })).toEqual(',left=300');
  });

  it('getWidth() should return the default string when the init parameter is not defined', () => {
    expect(BrowserWindowFeaturesBuilder.getWidth()).toEqual(',width=800');
  });
  
  it('getWidth() should return a string with the specified width value', () => {
    expect(BrowserWindowFeaturesBuilder.getWidth({ width: 500 })).toEqual(',width=500');
  });

  it('getHeight() should return the default string when the init parameter is not defined', () => {
    expect(BrowserWindowFeaturesBuilder.getHeight()).toEqual(',height=450');
  });
  
  it('getHeight() should return a string with the specified height value', () => {
    expect(BrowserWindowFeaturesBuilder.getHeight({ height: 500 })).toEqual(',height=500');
  });

  it('build() should not invoke the BrowserWindowFeaturesBuilder.setCenterPos() when the center parameter is not defined', () => {
    spyOn(BrowserWindowFeaturesBuilder, "setCenterPos");
    BrowserWindowFeaturesBuilder.build();
    expect(BrowserWindowFeaturesBuilder.setCenterPos).not.toHaveBeenCalled();
  });

  it('build() should invoke the BrowserWindowFeaturesBuilder.setCenterPos() when the center parameter is true', () => {
    const initCenter: WindowInit = { center: true };
    spyOn(BrowserWindowFeaturesBuilder, "setCenterPos");
    BrowserWindowFeaturesBuilder.build(initCenter);
    expect(BrowserWindowFeaturesBuilder.setCenterPos).toHaveBeenCalledWith(initCenter);
  });
  
  it('getPopupProp() should return the an empty string when the init parameter is not defined', () => {
    expect(BrowserWindowFeaturesBuilder.getPopupProp("titlebar")).toEqual(EMPTY_STRING);
  });
  
  it('getPopupProp() should return a string with the specified parameter value', () => {
    expect(BrowserWindowFeaturesBuilder.getPopupProp("directories", { directories: WindowFeatureState.NO})).toEqual(",directories=no");
    expect(BrowserWindowFeaturesBuilder.getPopupProp("titlebar", { titlebar: WindowFeatureState.NO})).toEqual(",titlebar=no");
    expect(BrowserWindowFeaturesBuilder.getPopupProp("scrollbars", { scrollbars: WindowFeatureState.YES})).toEqual(",scrollbars=yes");
    expect(BrowserWindowFeaturesBuilder.getPopupProp("toolbar", { toolbar: WindowFeatureState.NO})).toEqual(",toolbar=no");
    expect(BrowserWindowFeaturesBuilder.getPopupProp("location", { location: WindowFeatureState.YES})).toEqual(",location=yes");
    expect(BrowserWindowFeaturesBuilder.getPopupProp("status", { status: WindowFeatureState.NO})).toEqual(",status=no");
    expect(BrowserWindowFeaturesBuilder.getPopupProp("menubar", { menubar: WindowFeatureState.YES})).toEqual(",menubar=yes");
  });
  
  it('setCenterPos() should set the top and left properties', () => {
    const initCenter: WindowInit = { center: true };
    expect(initCenter.left).toBeUndefined();
    expect(initCenter.top).toBeUndefined();
    BrowserWindowFeaturesBuilder.setCenterPos(initCenter);
    expect(initCenter.left).toEqual(jasmine.any(Number));
    expect(initCenter.top).toEqual(jasmine.any(Number));
  });
  
  it('setCenterPos() should update the top and left properties', () => {
    const initCenter: WindowInit = { center: true };
    initCenter.left = -100;
    initCenter.top = -100;
    BrowserWindowFeaturesBuilder.setCenterPos(initCenter);
    expect(initCenter.left).not.toEqual(-100);
    expect(initCenter.top).not.toEqual(-100);
  });
});