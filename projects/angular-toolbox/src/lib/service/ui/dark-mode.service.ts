import { Inject, Injectable, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const STORAGE_KEY: string = "dark-mode-key";
const CSS_PROP: string = "dark-mode";
const ADD_ACTION: string = "add";
const REMOVE_ACTION: string = "remove";

export interface DarkModeConfig {
    useDarkMode?: boolean;
    detectBrowserSettings?: boolean;
    cssProperty?: string;
    storageKey?: string;
}

export const DARK_MODE_CONFIG: DarkModeConfig = {
    useDarkMode: false,
    detectBrowserSettings: true,
    cssProperty: CSS_PROP,
    storageKey: STORAGE_KEY
};

@Injectable({
    providedIn: 'root'
})
export class DarkModeService {

    private _useDarkMode: boolean = false;
    private _cssProperty: string = CSS_PROP;
    private _storageKey: string = STORAGE_KEY;

    public readonly change: EventEmitter<boolean> = new EventEmitter<boolean>(true);

    constructor(@Inject(DOCUMENT) private _document: Document, @Inject(DARK_MODE_CONFIG) config: DarkModeConfig) {
        this.initDarkMode(config);
    }

    public toggleDarkMode(): void {
        this._useDarkMode ? this.disableDarkMode() : this.enableDarkMode();
    }

    public enableDarkMode(): void {
        this.setDarkMode(ADD_ACTION);
        this.setStoredDarkMode();
    }

    public disableDarkMode(): void {
        this.setDarkMode(REMOVE_ACTION);
        this.setStoredDarkMode();
    }

    public useDarkMode(): boolean {
        return this._useDarkMode;
    }

    private initDarkMode(config: DarkModeConfig): void {
        this._useDarkMode = config.useDarkMode || false;
        this._cssProperty = config.cssProperty || CSS_PROP;
        this._storageKey = config.storageKey || STORAGE_KEY;
        this.initStoredDarkMode();
        if (config.detectBrowserSettings) this.initBrowserMode();
    }
    
    private initStoredDarkMode(): void {
        const result: string | null = localStorage.getItem(this._storageKey);
        if (result === "true") this.setDarkMode(ADD_ACTION);
    }

    private setStoredDarkMode(): void {
        const data: string = String(this._useDarkMode);
        localStorage.setItem(this._storageKey, data);
    }

    private setDarkMode(action: string): void {
        const classList: DOMTokenList = this._document.body.classList;
        if (action === ADD_ACTION) {
            classList.add(this._cssProperty);
            this._useDarkMode = true;
        } else if (action === REMOVE_ACTION) {
            classList.remove(this._cssProperty);
            this._useDarkMode = false;
        }
        this.change.emit(this._useDarkMode);
    }

    private initBrowserMode(): void {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setDarkMode(ADD_ACTION);
        }
    }
}

