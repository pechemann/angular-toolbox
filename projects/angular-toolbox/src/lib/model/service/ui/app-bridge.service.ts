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
import { AppBridgeError } from '../../../core';
import { BrowsingContext } from '../../../util';
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
const NATIVE_COMMANDS: string = "navigate|goToAnchor|setLocation|open|declareCommand|deleteCommand|getCommand";

/**
 * @unstable Not tested yet.
 * A utility service that allows HTML fragments dynamically loaded, to interact with the Angular application.
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
                @Inject(DOCUMENT) document: any) {
        this._defaultView = document.defaultView;
        this._appBridge = new AppBridge();
        if(!this._defaultView[APP_PRIDGE_REF]) this._defaultView[APP_PRIDGE_REF] = this;
    }

    /**
     * Provides the ability to invoke the `navigate()` method of the Angular app router.
     * 
     * @unstable Not tested yet.
     * @param commands The commands array as specified by the Angular router `navigate()` method.
     * @param extras The navigation options as specified by the Angular router `navigate()` method.
     */
    public navigate(commands: string[], extras?: NavigationExtras | undefined): void {
        this._zone.run(() => {
            return this._router.navigate(commands, extras);
        });
    }

    /**
     * Allows to scroll to the fragment specified by the `href attribute` when the user element interact with the associated element.
     * 
     * @example
     * <a href="#myAnchor" onclick="appBridge.goToAnchor(event)">My Section</a></code>
     * 
     * @unstable Not tested yet.
     * @param event The event that triggers the anchor navigation.
     */
    public goToAnchor(event: Event): void {
        event.preventDefault();
        const anchor: string = (event.target as any).getAttribute(HREF);
        if (!anchor) return;
        this._zone.run(() => {
           return this._router.navigate([], { fragment: anchor.slice(1)});
        });
        (document.querySelector(anchor) as HTMLElement).scrollIntoView(DEFAULT_SCROLL_BEHAVIOR);
    }

    /**
     * Declares a new javascript command to be used with dynamically loaded documents.
     * 
     * @unstable Not tested yet.
     * @param name The name of the command to declare.
     * @param command The reference to a javascript command to be used with dynamically loaded documents.
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
     * Unregisters a javascript command previously referenced with the `declareCommand()` method.
     * 
     * @unstable Not tested yet.
     * @param name The name of the command to remove.
     */
    public deleteCommand(name: string): void {
        this.checkCommandName(name);
        if(!this._appBridge.removeCommand(name)) return;
        delete this._defaultView[APP_PRIDGE_REF][name];
    }
    
    /**
     * Returns the javascript command previously referenced with the `declareCommand()` method.
     * 
     * @unstable Not tested yet.
     * @param name The name of the command to retreive.
     * @returns The javascript command previously referenced with the specified `name` parameter.
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