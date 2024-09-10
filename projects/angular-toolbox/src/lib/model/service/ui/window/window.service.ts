/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ApplicationRef, ComponentRef, Injectable, OnDestroy, Type } from "@angular/core";
import { EMPTY_STRING, Uuid } from "../../../../util";
import { WindowInit, WindowRef } from "../../../business";
import { WindowTarget } from "../../../business/ui/window/window-target";
import { BrowserWindowFeaturesBuilder } from "../../../../util/window/window-features-builder";
import { WindowHeaderTagUtil } from "../../../../util/window/window-header-tag-util";
import { AbstractWindowService } from "./abstract-window.service";

/**
 * @private
 */
type EvtListener = (this: Window, ev: BeforeUnloadEvent) => any;

/**
 * @private
 */
const EVT_TYPE: string = "beforeunload";

/**
 * Provides functionality to display Angular component within a new browser window.
 */
@Injectable({
  providedIn: 'root'
})
export class WindowService extends AbstractWindowService implements OnDestroy {

  /**
   * @private
   */
  constructor(private _appRef: ApplicationRef) {
    super();
    const beforeUnloadHandler: EvtListener = ()=> {
      this.ngOnDestroy();
      window.removeEventListener(EVT_TYPE, beforeUnloadHandler);
    };
    window.addEventListener(EVT_TYPE, beforeUnloadHandler);
  }

  /**
   * @inheritdoc
   */
  public open<T>(component: Type<T>, init?: WindowInit): Uuid {
    const id: Uuid = Uuid.build();
    const features: string = BrowserWindowFeaturesBuilder.build(init);
    const win: WindowProxy = window.open(EMPTY_STRING, this.getTarget(init), features) as WindowProxy;
    WindowHeaderTagUtil.setTitle(win, init);
    WindowHeaderTagUtil.setIcon(win, init);
    const componentRef: ComponentRef<T> = this._appRef.bootstrap(component, win.document.body);
    const winRef: WindowRef<T, Window> = {
      window: win as Window,
      componentRef: componentRef
    };
    const unloadListener: EvtListener = ()=> {
      this.windowClose.emit(id);
      win.removeEventListener(EVT_TYPE, unloadListener);
    };
    win.addEventListener(EVT_TYPE, unloadListener);
    this.windowRefMap.set(id, winRef);
    return id;
  }

  /**
   * @inheritdoc
   */
  public close(uuid: Uuid): boolean {
    const winRef: WindowRef<any, Window> | undefined = this.windowRefMap.get(uuid);
    if (!winRef) return false;
    this.windowRefMap.delete(uuid);
    winRef.window.close();
    winRef.window = null as any;
    winRef.componentRef.destroy();
    winRef.componentRef as any;
    return true;
  }

  /**
   * @inheritdoc
   */
  public closeAll(): void {
    const keys: IterableIterator<Uuid> = this.windowRefMap.keys();
    for (const key of keys) this.close(key);
  }

  /**
   * @private
   */
  public ngOnDestroy(): void {
    this.closeAll();
    this.destroy();
  }

  /**
   * @private
   */
  private getTarget(init?: WindowInit): WindowTarget {
    if (init) return init.target || WindowTarget.BLANK;
    return WindowTarget.BLANK;
  }
}