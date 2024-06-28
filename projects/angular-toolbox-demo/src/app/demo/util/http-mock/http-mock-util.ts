/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

export interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
};

const loremIpsum: string[] = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore'];

const getRandomString = (size: number, isFirst: boolean = true): string => {
    let result: string = loremIpsum[Math.floor(Math.random()* loremIpsum.length)];
    if (size > 1) result += " " + getRandomString(--size, false);
    if (isFirst) return result.charAt(0).toUpperCase() + result.slice(1);
    return result;
};

const getRandomBoolean = (): boolean => Math.random() < 0.4;

export const getTodo = (params: any): Todo => {
    return {
        id: params.id,
        userId: 1,
        title: getRandomString(4),
        completed: getRandomBoolean()
    };
};
