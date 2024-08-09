/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxHtmlLogConnector, AtxLogBuilder, AtxLogLevel, AtxLogUtil, EMPTY_STRING } from "projects/angular-toolbox/src/public-api";

const TIMESTAMP_REGEXP: RegExp = /\[\d{2}:\d{2}:\d{2}]/;
const CALLER_REGEXP: RegExp = /\[.+\]:\s/;

const CALLER: string = "testSuite";
const LOG_MESSAGE: string = "Log message";
const buildLog = (level: AtxLogLevel, metadata?: any)=> {
    return AtxLogBuilder.build(CALLER, LOG_MESSAGE, level, metadata);
};
const buildConnector = (target: HTMLElement, injectStyle: boolean)=> {
    return new AtxHtmlLogConnector(target, injectStyle);
};

describe('AtxHtmlLogConnector', () => {

    let connector: AtxHtmlLogConnector;
    let htmlTarget: HTMLDivElement;
    
    beforeEach(async () => {
        htmlTarget = document.createElement("div");
    });

    afterEach(async () => {
        htmlTarget = null as any;
        if (connector) connector.destroy();
    });

    it('should create an instance', () => {
        connector = buildConnector(htmlTarget, false);
        expect(connector).toBeTruthy();
    });

    it('should add ATX styles to the dom by default', () => {
        connector = new AtxHtmlLogConnector(htmlTarget);
        const styles = document.getElementById('atx-log-container-style');
        expect(styles).toBeTruthy();
    });
    
    it('destroy() should remove ATX styles from the dom', () => {
        connector = new AtxHtmlLogConnector(htmlTarget);
        connector.destroy();
        const styles = document.getElementById('atx-log-container-style');
        expect(styles).toBeNull();
        connector = null as any;
    });

    it('should not add ATX styles to the dom when injectStyle parameter is false', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        const styles = document.getElementById('atx-log-container-style');
        expect(styles).toBeNull();
    });
    
    it('init() should do nothing if list is empty', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.init([]);
        expect(htmlTarget.children.length).toEqual(0);
    });
    
    it('init() should invoke sendLog() to process the initial logs', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        const logSpy = spyOn(connector, "sendLog");
        connector.init([
            buildLog(AtxLogLevel.LOG),
            buildLog(AtxLogLevel.ERROR)
        ]);
        expect(logSpy).toHaveBeenCalledTimes(2);
    });
    
    it('sendLog() should display logs into the HTML renderer', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.LOG));
        expect(htmlTarget.children.length).toEqual(1);
    });

    it('sendLog() should process logs and display them into the HTML renderer with the right structure', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.LOG));
        const htmlLog = htmlTarget.children.item(0);
        expect(htmlLog?.classList.contains("atx-log")).toBeTrue();
        expect(htmlLog?.querySelector(".atx-log-time")).toBeTruthy();
        expect(htmlLog?.querySelector(".atx-log-caller")).toBeTruthy();
        expect(htmlLog?.querySelector(".atx-log-message")).toBeTruthy();
    });

    it('sendLog() should render logs with well formated timestamps', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.LOG));
        const htmlLog = htmlTarget.children.item(0);
        const tsNode = htmlLog?.querySelector(".atx-log-time");
        expect(TIMESTAMP_REGEXP.test(tsNode?.innerHTML as any)).toBeTrue();
    });

    it('sendLog() should render logs with well formated caller reference', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.LOG));
        const htmlLog = htmlTarget.children.item(0);
        const calNode = htmlLog?.querySelector(".atx-log-caller");
        const callerNodeString: string = calNode?.innerHTML as any;
        expect(CALLER_REGEXP.test(callerNodeString)).toBeTrue();
        expect(callerNodeString.includes(CALLER)).toBeTrue();
    });

    it('sendLog() should render logs with well formated message reference', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.LOG));
        const htmlLog = htmlTarget.children.item(0);
        const msgNode = htmlLog?.querySelector(".atx-log-message");
        expect(msgNode?.innerHTML).toEqual(LOG_MESSAGE);
    });

    it('sendLog() should process logs and display them into the HTML renderer with the right structure if log level is AtxLogLevel.WARNING', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.WARNING));
        const htmlLog = htmlTarget.children.item(0);
        expect(htmlLog?.classList.contains("atx-warn-log")).toBeTrue();
        expect(htmlLog?.querySelector(".atx-log-time")).toBeTruthy();
        expect(htmlLog?.querySelector(".atx-log-caller")).toBeTruthy();
        expect(htmlLog?.querySelector(".atx-log-message")).toBeTruthy();
    });

    it('sendLog() should process logs and display them into the HTML renderer with the right structure if log level is AtxLogLevel.ERROR', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.ERROR));
        const htmlLog = htmlTarget.children.item(0);
        expect(htmlLog?.classList.contains("atx-error-log")).toBeTrue();
        expect(htmlLog?.querySelector(".atx-log-time")).toBeTruthy();
        expect(htmlLog?.querySelector(".atx-log-caller")).toBeTruthy();
        expect(htmlLog?.querySelector(".atx-log-message")).toBeTruthy();
    });

    it('clearLogs() should remove logs to the HTML renderer element', () => {
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.LOG));
        connector.sendLog(buildLog(AtxLogLevel.ERROR));
        connector.clearLogs();
        expect(htmlTarget.children.length).toEqual(0);
    });
    
    it('copyLogs() should send logs to the clipboard', () => {
        const clipboard = navigator.clipboard;
        const spy = spyOn(clipboard, 'writeText');
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.LOG));
        connector.sendLog(buildLog(AtxLogLevel.ERROR));
        connector.copyLogs();
        expect(spy).toHaveBeenCalled();
    });
    
    it('copyLogs() should use the AtxLogUtil API to send logs to the clipboard', () => {
        // Log formatting is tested in the AtxLogUtil test suite.
        const spy = spyOn(AtxLogUtil, 'logListToString');
        spyOn(navigator.clipboard, 'writeText');
        connector = new AtxHtmlLogConnector(htmlTarget, false);
        connector.sendLog(buildLog(AtxLogLevel.LOG));
        connector.sendLog(buildLog(AtxLogLevel.ERROR));
        connector.copyLogs();
        expect(spy).toHaveBeenCalled();
    });
});
