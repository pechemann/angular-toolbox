/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DOCUMENT } from '@angular/common';
import { Injectable, Inject, OnDestroy, Output, EventEmitter } from '@angular/core';

// --> Internal members
/**
 * @private
 */
const EVENT_REF: string = 'resize';

/**
 * A utility service that manages applications fullscreen mode.
 */
@Injectable({
    providedIn: 'root'
})
export class FullscreenService implements OnDestroy {

    /**
     * Dispatches events each time the fullscreen mode API is invoked.
     */
    @Output()
    public readonly change: EventEmitter<boolean> = new EventEmitter();

    /**
     * A `boolean` value that indicates whether the application is displayed in fullscreen mode (`true`), or not (`false`).
     * 
     * @returns `true` whether the application is displayed in fullscreen mode; `false` otherwise.
     */
    public get isFullscreenModeActive(): boolean {
        return this._isFsMode;
    }

    /**
     * @private
     * Indicates whther the app is currently displayed in fullscreen mode (`true`), or not (`false`).
     */
    private _isFsMode: boolean = false;

    /**
     * @private
     * The reference to the event handler method for destruction.
     */
    private _eventHandler: (event: Event)=>void;

    /**
     * @private
     * Creates a new `FullscreenService` instance.
     * 
     * @param _document The reference to the `Document` singleton.
     */
    constructor(@Inject(DOCUMENT) private _document: Document) {
        this._isFsMode = this.getFsMode();
        this._eventHandler = this.fsEventHandler.bind(this);
        window.addEventListener(EVENT_REF, this._eventHandler);
    }

    /**
     * @private
     */
    public ngOnDestroy(): void {
        window.removeEventListener(EVENT_REF, this._eventHandler);
    }

    /**
     * Toggles the application between fullscreen/default modes.
     * 
     * @param target An optional `Element` object on which to invoque the `requestFullscreen()` method.
     * @param options An optional object that controls the behavior of the transition to fullscreen mode.
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#options
     * 
     * @return  A `Promise` which is resolved with a value of undefined when the transition to full screen is complete.
     */
    public toggleFullscreenMode(target: Element | null = null, options?: FullscreenOptions): Promise<void> {
        const D: Document = this._document;
        if (!D.fullscreenElement) {
            const TGT: Element = target === null ? D.documentElement : target;
            return TGT.requestFullscreen(options);
        }
        return D.exitFullscreen();
    }

    /**
     * @private
     */
    private getFsMode(): boolean {
        return (screen.height !== window.innerHeight) ? false : true;
    }

    /**
     * @private
     */
    private fsEventHandler(): void {
        const newVal: boolean = this.getFsMode();
        // Prevents event dispatching when window is resized by user actions.
        if (this._isFsMode === newVal) return;
        this._isFsMode = newVal;
        this.change.emit(newVal);
    }
}