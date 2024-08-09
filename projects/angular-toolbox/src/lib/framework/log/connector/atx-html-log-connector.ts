/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EMPTY_STRING } from "angular-toolbox";
import { AtxLog, AtxLogConnector } from "../../../model";
import { AtxLogLevel } from "../../../util";
import { AtxLogUtil } from "../util";

/**
 * @private
 */
const DIV: string = "div";

/**
 * @private
 */
const SPAN: string = "span";

/**
 * @private
 */
const S_LOG: string = "atx-log";

/**
 * @private
 */
const S_LOG_ERROR: string = "atx-error-log";

/**
 * @private
 */
const S_WARN: string = "atx-warn-log";

/**
 * @private
 */
const S_LOG_TIME: string = "atx-log-time";

/**
 * @private
 */
const S_LOG_CALLER: string = "atx-log-caller";

/**
 * @private
 */
const S_LOG_MSG: string = "atx-log-message";

/**
 * @private
 */
const STYLE_ID: string = 'atx-log-container-style';

/**
 * An implementation of the `AtxLogConnector` interface that processes logs as HTML renderable elements.
 */
export class AtxHtmlLogConnector implements AtxLogConnector {

    /**
     * @private
     */
    private _logs: AtxLog[] = [];
    
    /**
     * @private
     */
    private _tgt: HTMLElement;

    /**
     * Creates a new `AtxHtmlLogConnector` instance.
     * 
     * @param target The HTML element where the logs will be rendered.
     * @param injectStyle Indicates whether the ATX default HTML styles are injected into the current document (`true`), or not (`false`).
     */
    constructor(target: HTMLElement, injectStyle: boolean = true) {
        this._tgt = target;
        if (injectStyle) this.injectStyle()
    }
    
    /**
     * @inheritdoc
     */
    public init(logList: AtxLog[]): void {
        const len: number = logList.length - 1;
        let i: number = 0;
        for (; i <= len; ++i) this.sendLog(logList[i]);
    }
    
    /**
     * @inheritdoc
     */
    public sendLog(log: AtxLog): void {
        this._logs.push(log);
        this._tgt.appendChild(this.buildLog(log));
    }

    /**
     * @inheritdoc
     */
    public destroy(): void {
        this._tgt = null as any;
        this._logs.length = 0;
        this._logs = null as any;
        this.deleteStyle();
    }
    
    /**
     * @inheritdoc
     */
    public clearLogs(): void {
        this._logs.length = 0;
        this._tgt.innerHTML = EMPTY_STRING;
    }
    
    /**
     * @inheritdoc
     */
    public copyLogs(): void {
      const logs: string = AtxLogUtil.logListToString(this._logs);
      navigator.clipboard.writeText(logs);
    }
    
    /**
     * @private
     */
    private buildLog(log: AtxLog): HTMLElement {
        const d: HTMLElement = document.createElement(DIV);
        d.classList.add(this.getCssClassName(log.level));
        d.appendChild(
            this.getSpan(`[${AtxLogUtil.dateToHHMMSS(log.timestamp)}]`, S_LOG_TIME)
        );
        d.appendChild(
            this.getSpan(`[${log.caller}]: `, S_LOG_CALLER)
        );
        d.appendChild(
            this.getSpan(log.message, S_LOG_MSG)
        );
        return d;
    }

    /**
     * @private
     */
    private getCssClassName(level: AtxLogLevel) : string {
        if (level === AtxLogLevel.LOG) return S_LOG;
        if (level === AtxLogLevel.ERROR) return S_LOG_ERROR;
        return S_WARN;
    }

    /**
     * @private
     */
    private getSpan(value: any, style: string | null = null): HTMLElement {
        const s: HTMLElement = document.createElement(SPAN);
        if(style) s.classList.add(style);
        s.innerText = value;
        return s;
    }

    /**
     * @private
     */
    private injectStyle() {
        const style: HTMLStyleElement = document.createElement('style');
        style.id = STYLE_ID;
        style.innerHTML = ".atx-log-container{width:100%;background:black;font-family:monospace;font-size:14px;padding:10px 12px}.atx-log{color:white}.atx-error-log{color:red}.atx-warn-log{color:gold}";
        this._tgt.classList.add("atx-log-container");
        this.getHead().appendChild(style);
    }

    /**
     * @private
     */
    private deleteStyle(): void {
        const style: HTMLElement | null = document.getElementById(STYLE_ID);
        if (style) this.getHead().removeChild(style);
    }

    /**
     * @private
     */
    private getHead(): HTMLHeadElement {
        return document.getElementsByTagName('head')[0];
    }
}