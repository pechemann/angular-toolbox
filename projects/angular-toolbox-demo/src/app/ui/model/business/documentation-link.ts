/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */


export interface DocumentationLinkMenu {
    menu: DocumentationLink[];
}

export interface DocumentationLink {
    label: string;
    commands: string[];
}