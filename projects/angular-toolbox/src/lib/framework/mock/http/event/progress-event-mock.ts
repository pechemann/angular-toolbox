/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

/**
 * @private
 * A utility class used by delegate `XhrProxy` instances to dispatch `ProgressEvent`
 * instances.
 * 
 * This class is not exposed.
 */
export class ProgressEventMock extends ProgressEvent {
    
    /**
     * @private
     */
    private _total: number = NaN;

    /**
     * A 64-bit unsigned integer indicating the size, in bytes, of the data already
     * transmitted or processed. 
     */
    override set total(value: number) {
        this._total = value;
    }
    override get total(): number {
        return this._total;
    }
    
    /**
     * @private
     */
    private _loaded: number = 0;

    /**
     * A 64-bit unsigned integer indicating the total size, in bytes, of the data being
     * transmitted or processed. 
     */
    override set loaded(value: number) {
        this._loaded = value;
    }
    override get loaded(): number {
        return this._loaded;
    }
}