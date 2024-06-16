import { Inject, Injectable, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DarkModeConfig } from '../../model';

// --> Internal constants
const STORAGE_KEY: string = "dark-mode-key";
const CSS_PROP: string = "dark-mode";
const ADD_ACTION: string = "add";
const REMOVE_ACTION: string = "remove";

/**
 * The default provider for the DarkModeService configuration. You typically define
 * the custom properties in the main NgModule declaration to initialize the app dark mode:
 * 
 * @NgModule({
 * ...
 * providers: [
 *   { provide: DARK_MODE_CONFIG, useValue: { enableDarkMode: true } }
 * ],
 * ...
 * });
 */
export const DARK_MODE_CONFIG: DarkModeConfig = {
    
    /**
     * Indicates whether the dark mode uses browser settings (true), or not (false).
     * Default value is false.
     */
    darkModeEnabled: false,
    
    /**
     * Indicates whether the dark mode uses browser settings (true), or not (false).
     * Default value is false.
     */
    detectBrowserSettings: false,
    
    /**
     * CSS property name used to set the dark mode look and feel.
     * Default value is 'dark-mode'.
     */
    cssProperty: CSS_PROP,
    
    /**
     * Reference to the key value used to persist the dark mode state to local storage.
     * Default value is 'dark-mode-key'.
     */
    storageKey: STORAGE_KEY
};

@Injectable({
    providedIn: 'root'
})
/**
 * A lightweight service that provides Dark Mode implementation for your Angular application.
 */
export class DarkModeService {

    // --> Private properties
    private _darkModeEnabled: boolean = false;
    private _cssProperty: string = CSS_PROP;
    private _storageKey: string = STORAGE_KEY;

    /**
     * The callback function that is triggered when the dark mode changes.
     * @typeParam EventEmitter<boolean> the value returned by the darkModeEnabled() property.
     */
    public readonly change: EventEmitter<boolean> = new EventEmitter<boolean>(true);

    /**
     * Creates a new DarkModeService instance.
     * @param _document the reference to the Document singleton.
     * @param config the reference to the DarkModeConfig provider.
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
     * Returns a boolean value that indicates the dark mode state is active (true), or not (false).
     * @returns true whether the dark mode state is active; false otherwise.
     */
    public darkModeEnabled(): boolean {
        return this._darkModeEnabled;
    }

    /**
     * Returns the value of the CSS property as defined by the config provider.
     * @returns the value of the CSS property.
     */
    public getCssProperty(): string {
        return this._cssProperty;
    }

    /**
     * Returns the value of the storage key as defined by the config provider.
     * @returns the value of the storage key.
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

    // --> Private methods
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
    
    private initStoredDarkMode(): void {
        const result: string | null = localStorage.getItem(this._storageKey);
        if (result === "true") this.enableDarkMode();
    }

    private setStoredDarkMode(): void {
        const data: string = String(this._darkModeEnabled);
        localStorage.setItem(this._storageKey, data);
    }

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

    private initBrowserMode(): void {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.enableDarkMode();
        }
    }
}

