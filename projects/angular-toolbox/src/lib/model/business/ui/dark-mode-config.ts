/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

/**
 * Defines properties for the `DarkModeService` configuration.
 */
export interface DarkModeConfig {

    /**
     * Indicates whether the dark mode is activated by default (`true`), or not (`false`).
     */
    darkModeEnabled?: boolean;
    
    /**
     * Indicates whether the dark mode uses browser settings (`true`), or not (`false`).
     * When `true`, this property overrides the `darkModeEnabled` property.
     */
    detectBrowserSettings?: boolean;

    /**
     * CSS property name used to set the dark mode look and feel.
     */
    cssProperty?: string;

    /**
     * Reference to the key value used to persist the dark mode state to local storage.
     */
    storageKey?: string;
}
