/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { WindowInit } from "../../model";

/**
 * A static utility class that creates header tags for windows created by the `WindowService.open()` method.
 */
export class WindowHeaderTagUtil {

    /**
     * Sets the title of the specified window if defined in the `WindowInit` config object.
     * 
     * @param win The window for which to set the title.
     * @param init The `WindowInit` config object used to initialize the window.
     */
    public static setTitle(win: Window, init?: WindowInit): void {
        const title: string | undefined = init?.title;
        if (!title) return;
        win.document.title = title;
    }

    /**
     * Sets the icon of the specified window if defined in the `WindowInit` config object.
     * 
     * @param win The window for which to set the icon.
     * @param init The `WindowInit` config object used to initialize the window.
     */
    public static setIcon(win: Window, init?: WindowInit): void {
        const icon: string | undefined = init?.icon;
        if (!icon) return;
        const doc: Document = win.document;
        const head: HTMLHeadElement = doc.getElementsByTagName('head')[0];
        const link: HTMLLinkElement = doc.createElement('link');
        link.rel = 'shortcut icon';
        link.href = icon;
        head.appendChild(link);
    }
}
