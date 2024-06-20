/**
 * 
 */
export class ProgressEventMock extends ProgressEvent {
    
    private _total: number = NaN;

    override set total(value: number) {
        this._total = value;
    }

    override get total(): number {
        return this._total;
    }
    
    private _loaded: number = 0;

    override set loaded(value: number) {
        this._loaded = value;
    }

    override get loaded(): number {
        return this._loaded;
    }
}