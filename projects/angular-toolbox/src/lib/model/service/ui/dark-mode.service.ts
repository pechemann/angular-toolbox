/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Inject, Injectable, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CSS_PROP, DARK_MODE_CONFIG, DarkModeConfig, STORAGE_KEY } from '../../business';

// --> Internal constants
/**
 * @private
 */
const ADD_ACTION: string = "add";

/**
 * @private
 */
const REMOVE_ACTION: string = "remove";

/**
 * @private
 */
const TRUE: string = "true";

@Injectable({
    providedIn: 'root'
})
/**
 * A lightweight service that provides Dark Mode implementation for your Angular application.
 */
export class DarkModeService {
    
    /**
     * @private
     */
    private _darkModeEnabled: boolean = false;

    /**
     * @private
     */
    private _cssProperty: string = CSS_PROP;

    /**
     * @private
     */
    private _storageKey: string = STORAGE_KEY;

    /**
     * The callback function that is triggered when the dark mode changes.
     * 
     * @typeParam `EventEmitter<boolean>` the value returned by the `darkModeEnabled()` property.
     */
    public readonly change: EventEmitter<boolean> = new EventEmitter<boolean>(true);

    /**
     * @private
     * Creates a new `DarkModeService` instance.
     * 
     * @param _document The reference to the `Document` singleton.
     * @param config The reference to the `DarkModeConfig` provider.
     */
    constructor(@Inject(DOCUMENT) private _document: Document, @Inject(DARK_MODE_CONFIG) config: DarkModeConfig) {
        this.initDarkMode(config);
    }

    /**
     * Toogles the dark mode state.
     */
    public toggleDarkMode(): void {
        this._darkModeEnabled ? this.disableDarkMode() : this.enableDarkMode();
    }

    /**
     * Sets the dark mode state to active.
     */
    public enableDarkMode(): void {
        this.setDarkMode(ADD_ACTION);
        this.setStoredDarkMode();
    }

    /**
     * Sets the dark mode state to inactive.
     */
    public disableDarkMode(): void {
        this.setDarkMode(REMOVE_ACTION);
        this.setStoredDarkMode();
    }

    /**
     * Returns a `boolean` value that indicates the dark mode state is active (`true`), or not (`false`).
     * 
     * @returns `true` whether the dark mode state is active; `false` otherwise.
     */
    public darkModeEnabled(): boolean {
        return this._darkModeEnabled;
    }

    /**
     * Returns the value of the CSS property as defined by the config provider.
     * 
     * @returns The value of the CSS property.
     */
    public getCssProperty(): string {
        return this._cssProperty;
    }

    /**
     * Returns the value of the storage key as defined by the config provider.
     * 
     * @returns The value of the storage key.
     */
    public getStorageKey(): string {
        return this._storageKey;
    }
    
    /**
     * Removes the dark mode information from local storage.
     */
    public invalidateStorage(): void {
        localStorage.removeItem(this._storageKey);
    }
    
    /**
     * @private
     */
    private initDarkMode(config: DarkModeConfig): void {
        this._darkModeEnabled = config.darkModeEnabled || false;
        this._cssProperty = config.cssProperty || CSS_PROP;
        this._storageKey = config.storageKey || STORAGE_KEY;
        if (this._darkModeEnabled) {
            this.enableDarkMode();
        } else {
            this.initStoredDarkMode();
        }
        if (config.detectBrowserSettings) this.initBrowserMode();
    }

    /**
     * @private
     */
    private initStoredDarkMode(): void {
        const result: string | null = localStorage.getItem(this._storageKey);
        if (result === TRUE) this.enableDarkMode();
    }
    
    /**
     * @private
     */
    private setStoredDarkMode(): void {
        const data: string = String(this._darkModeEnabled);
        localStorage.setItem(this._storageKey, data);
    }
    
    /**
     * @private
     */
    private setDarkMode(action: string): void {
        const classList: DOMTokenList = this._document.body.classList;
        if (action === ADD_ACTION) {
            classList.add(this._cssProperty);
            this._darkModeEnabled = true;
        } else if (action === REMOVE_ACTION) {
            classList.remove(this._cssProperty);
            this._darkModeEnabled = false;
        }
        this.change.emit(this._darkModeEnabled);
    }
    
    /**
     * @private
     */
    private initBrowserMode(): void {
        if (this.matchDarkTheme()) return this.enableDarkMode();
        this.disableDarkMode();
    }
    
    /**
     * @private
     */
    private matchDarkTheme(): boolean {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}
