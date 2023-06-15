import { Inject, Injectable, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// --> Internal constants
const STORAGE_KEY: string = "dark-mode-key";
const CSS_PROP: string = "dark-mode";
const ADD_ACTION: string = "add";
const REMOVE_ACTION: string = "remove";

export interface DarkModeConfig {
    darkModeEnbled?: boolean;
    detectBrowserSettings?: boolean;
    cssProperty?: string;
    storageKey?: string;
}

export const DARK_MODE_CONFIG: DarkModeConfig = {
    darkModeEnbled: false,
    detectBrowserSettings: true,
    cssProperty: CSS_PROP,
    storageKey: STORAGE_KEY
};

@Injectable({
    providedIn: 'root'
})
export class DarkModeService {

    private _darkModeEnbled: boolean = false;
    private _cssProperty: string = CSS_PROP;
    private _storageKey: string = STORAGE_KEY;

    public readonly change: EventEmitter<boolean> = new EventEmitter<boolean>(true);

    constructor(@Inject(DOCUMENT) private _document: Document, @Inject(DARK_MODE_CONFIG) config: DarkModeConfig) {
        this.initDarkMode(config);
    }

    public toggleDarkMode(): void {
        this._darkModeEnbled ? this.disableDarkMode() : this.enableDarkMode();
    }

    public enableDarkMode(): void {
        this.setDarkMode(ADD_ACTION);
        this.setStoredDarkMode();
    }

    public disableDarkMode(): void {
        this.setDarkMode(REMOVE_ACTION);
        this.setStoredDarkMode();
    }

    public darkModeEnabled(): boolean {
        return this._darkModeEnbled;
    }

    public invalidateStorage(): void {
        localStorage.removeItem(this._storageKey);
    }

    private initDarkMode(config: DarkModeConfig): void {
        this._darkModeEnbled = config.darkModeEnbled || false;
        this._cssProperty = config.cssProperty || CSS_PROP;
        this._storageKey = config.storageKey || STORAGE_KEY;
        if (this._darkModeEnbled) {
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
        const data: string = String(this._darkModeEnbled);
        localStorage.setItem(this._storageKey, data);
    }

    private setDarkMode(action: string): void {
        const classList: DOMTokenList = this._document.body.classList;
        if (action === ADD_ACTION) {
            classList.add(this._cssProperty);
            this._darkModeEnbled = true;
        } else if (action === REMOVE_ACTION) {
            classList.remove(this._cssProperty);
            this._darkModeEnbled = false;
        }
        this.change.emit(this._darkModeEnbled);
    }

    private initBrowserMode(): void {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.enableDarkMode();
        }
    }
}

