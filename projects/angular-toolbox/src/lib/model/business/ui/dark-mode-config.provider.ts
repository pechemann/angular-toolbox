/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { DarkModeConfig } from "./dark-mode-config";
import { CSS_PROP, STORAGE_KEY } from "./dark-mode.constant";

/**
 * The default provider for the `DarkModeService` configuration. You typically define
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
     * Indicates whether the dark mode uses browser settings (`true`), or not (`false`).
     * Default value is `false`.
     */
    darkModeEnabled: false,
    
    /**
     * Indicates whether the dark mode uses browser settings (`true`), or not (`false`).
     * Default value is `false`.
     */
    detectBrowserSettings: false,
    
    /**
     * CSS property name used to set the dark mode look and feel.
     * Default value is `'dark-mode'`.
     */
    cssProperty: CSS_PROP,
    
    /**
     * Reference to the key value used to persist the dark mode state to local storage.
     * Default value is `'dark-mode-key'`.
     */
    storageKey: STORAGE_KEY
};