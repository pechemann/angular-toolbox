/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { FEATURES, WindowFeatureState } from "projects/angular-toolbox/src/public-api";

describe('FEATURES', () => {

    it('left should be 100', () => {
        expect(FEATURES.left).toEqual(100);
    });

    it('top should be 100', () => {
        expect(FEATURES.top).toEqual(100);
    });

    it('width should be 800', () => {
        expect(FEATURES.width).toEqual(800);
    });

    it('height should be 450', () => {
        expect(FEATURES.height).toEqual(450);
    });

    it('directories should be WindowFeatureState.NO', () => {
        expect(FEATURES.directories).toEqual(WindowFeatureState.NO);
    });

    it('titlebar should be WindowFeatureState.NO', () => {
        expect(FEATURES.titlebar).toEqual(WindowFeatureState.NO);
    });

    it('scrollbars should be WindowFeatureState.NO', () => {
        expect(FEATURES.scrollbars).toEqual(WindowFeatureState.NO);
    });

    it('toolbar should be WindowFeatureState.NO', () => {
        expect(FEATURES.toolbar).toEqual(WindowFeatureState.NO);
    });

    it('location should be WindowFeatureState.NO', () => {
        expect(FEATURES.location).toEqual(WindowFeatureState.NO);
    });

    it('status should be WindowFeatureState.NO', () => {
        expect(FEATURES.status).toEqual(WindowFeatureState.NO);
    });

    it('menubar should be WindowFeatureState.NO', () => {
        expect(FEATURES.menubar).toEqual(WindowFeatureState.NO);
    });

    it('title should be "HTTP Mocking Framework Console",', () => {
        expect(FEATURES.title).toEqual("HTTP Mocking Framework Console");
    });

    it('title should be "HTTP Mocking Framework Console",', () => {
        expect(FEATURES.icon?.startsWith("data:image/png;base64,")).toBeTrue();
    });
});