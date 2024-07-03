/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, Inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DEFAULT_SCROLL_BEHAVIOR } from '../../../util/default-scroll-behavior';
import { AppBridge } from '../../../core/bridge/app-bridge';
import { AppBridgeError } from '../../../core';
import { AppBridgeCommand } from '../../business/lang/app-bridge-command';

/**
 * @private
 */
export const APP_PRIDGE_REF: string = "appBridge";

/**
 * @private
 */
const HREF: string = "href";

/**
 * @private
 */
const NATIVE_COMMANDS: string = "navigate|goToAnchor|declareCommand|deleteCommand|getCommand";

/**
 * A utility service that allows dynamically injected HTML fragments, to interact with the Angular application.
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
     * Thereference to the command invoker.
     */
    private readonly _appBridge: AppBridge;

    /**
     * @private
     */
    constructor(private _router: Router,
                private _zone: NgZone,
                @Inject(DOCUMENT) private _document: any) {
        this._defaultView = _document.defaultView;
        this._appBridge = new AppBridge();
        if(!this._defaultView[APP_PRIDGE_REF]) this._defaultView[APP_PRIDGE_REF] = this;
    }

    /**
     * Provides the ability to invoke the `navigate()` method of the Angular app router.
     * 
     * @param commands The commands array as specified by the Angular router `navigate()` method.
     * @param extras The navigation options as specified by the Angular router `navigate()` method.
     * @return `Promise` that resolves to `true` when navigation succeeds, or `false` when navigation fails.
     * 
     * @see https://angular.dev/api/router/Router#navigate
     */
    public navigate(commands: string[], extras?: NavigationExtras | undefined): Promise<boolean> {
        return this._zone.run(() => {
            return this._router.navigate(commands, extras);
        });
    }

    /**
     * Allows to scroll to the fragment specified by the `href` attribute when the user element interact with the associated element.
     * 
     * @example
     * <a href="#myAnchor" onclick="appBridge.goToAnchor(event)">My Section</a></code>
     * 
     * @param event The event that triggers the anchor navigation.
     * @return `Promise` that resolves to `true` when navigation succeeds, or `false` when navigation fails.
     * 
     * @see https://angular.dev/api/router/Router#navigate
     */
    public goToAnchor(event: Event): Promise<boolean> {
        event.preventDefault();
        const anchor: string = (event.target as any).getAttribute(HREF);
        if (!anchor) throw new ReferenceError("href attribute is not defined.");
        const elm: any = this._document.querySelector(anchor);
        if (!elm) return new Promise((resolve: Function) => resolve(false));
        elm.scrollIntoView(DEFAULT_SCROLL_BEHAVIOR);
        return this._zone.run(() => {
           return this._router.navigate([], { fragment: anchor.slice(1)});
        });
    }

    /**
     * Declares a new JavaScript command to be used with dynamically loaded documents.
     * 
     * @param name The name of the command to declare.
     * @param command The reference to a JavaScript command to be used with dynamically loaded documents.
     */
    public declareCommand(name: string, command: AppBridgeCommand): void {
        this.checkCommandName(name);
        if(!this._appBridge.hasCommand(name)) {
            this._appBridge.addCommand(name, command);
            Object.defineProperty(this, name, {
                configurable: true,
                get: function() {
                    return this._appBridge.getCommand(name);
                }
            });
        }
    }
    
    /**
     * Unregisters a JavaScript command previously referenced with the `declareCommand()` method.
     * 
     * @param name The name of the command to remove.
     * 
     * @returns `true` whether the command existed and has been removed; `false` otherwise.
     */
    public deleteCommand(name: string): boolean {
        this.checkCommandName(name);
        if(!this._appBridge.removeCommand(name)) return false;
        delete this._defaultView[APP_PRIDGE_REF][name];
        return true;
    }
    
    /**
     * Returns the JavaScript command previously referenced with the `declareCommand()` method.
     * 
     * @param name The name of the command to retrieve.
     * @returns The JavaScript command previously referenced with the specified `name` parameter.
     *          If no command is found, returns `undefined`.
     */
    public getCommand(name: string): AppBridgeCommand | undefined {   
        return this._appBridge.getCommand(name);
    }

    /**
     * @private
     */
    private checkCommandName(name: string): void {
        if (NATIVE_COMMANDS.includes(name)) throw new AppBridgeError("Command name cannot be the reference to a native command: " + name);
    }
}