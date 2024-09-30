/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

export interface Item {
    id: string;
    data: any;
}

export type DataStorage = {
    item: Item | null;
}

export interface Token {
    id: string;
}

export interface ItemDto {
    id: string;
}

export interface UpdateItemDto {
    id: string;
    data: any;
}
