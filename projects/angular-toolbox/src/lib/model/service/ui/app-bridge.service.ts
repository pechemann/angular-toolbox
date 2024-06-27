/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, Inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DEFAULT_SCROLL_BEHAVIOR } from '../../../util/default-scroll-behavior';
import { AppBridge } from '../../../core/bridge/app-bridge';

/**
 * @private
 */
export const APP_PRIDGE_REF: string = "appBridge";

/**
 * @private
 */
const HREF: string = "href";

/**
 * 
 */
@Injectable({
    providedIn: 'root'
})
export class AppBrigeService {

    /**
     * @private
     */
    private readonly _defaultView: any;

    /**
     * @private
     */
    private readonly _appBridge: AppBridge;

    /**
     * @private
     */
    constructor(private _router: Router,
                private _zone: NgZone,
                @Inject(DOCUMENT) private _document: any) {
        this._defaultView = this._document.defaultView;
        this._appBridge = new AppBridge();
        if(!this._defaultView[APP_PRIDGE_REF]) this._defaultView[APP_PRIDGE_REF] = this;
    }

    public navigate(commands: string[], extras?: NavigationExtras | undefined): void {
        this._zone.run(() => {
            return this._router.navigate(commands, extras);
        });
    }

    public goToAnchor(event: MouseEvent): void {
        event.preventDefault();
        const anchor: string = (event.target as any).getAttribute(HREF);
        if (!anchor) return;
        this._zone.run(() => {
           return this._router.navigate([], { fragment: anchor.slice(1)});
        });
        (document.querySelector(anchor) as HTMLElement).scrollIntoView(DEFAULT_SCROLL_BEHAVIOR);
    }

    public setLocation(uri: string): void {
        this._defaultView.location.href = uri;
    }

    public open(uri: string): void {
        this._defaultView.open(uri, '_blank');
    }

    public declareCommand(name: string, value: any): void {
        if(!this._defaultView[APP_PRIDGE_REF][name]) {
            this._defaultView[APP_PRIDGE_REF][name] = value;
        }
    }
    
    public deleteCommand(name: string): void {   
        if (this._defaultView[APP_PRIDGE_REF][name]) {
            this._defaultView[APP_PRIDGE_REF][name] = null;
            delete this._defaultView[APP_PRIDGE_REF][name];
        }
    }
    
    public getCommand(name: string): any | undefined {   
        return this._defaultView[APP_PRIDGE_REF][name];
    }
}