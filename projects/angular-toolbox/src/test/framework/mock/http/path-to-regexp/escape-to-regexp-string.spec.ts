/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { escapeRegexpString } from "../../../../../lib/framework/mock/http/path-to-regexp/escape-to-regexp-string";

describe('escapeRegexpString()', () => {

    const HTTP_PARSER: RegExp = /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/;
    const HTTP_PARSER_SRC_ESCAPED: string = String.raw`\^\(https\?\\\:\)\\\/\\\/\(\(\[\^\:\\\/\?#\]\*\)\(\?\:\\\:\(\[0-9\]\+\)\)\?\)\(\[\\\/\]\{0,1\}\[\^\?#\]\*\)\(\\\?\[\^#\]\*\|\)\(#\.\*\|\)\$`;

    it('should escape dot (".") characters', () => {
        expect(escapeRegexpString(".")).toEqual("\\.");
    });
  
    it('should escape plus ("+") characters', () => {
        expect(escapeRegexpString("+")).toEqual("\\+");
    });

    it('should escape qasterisk ("*") characters', () => {
        expect(escapeRegexpString("*")).toEqual("\\*");
    });

    it('should escape question mark ("?") characters', () => {
        expect(escapeRegexpString("?")).toEqual("\\?");
    });
    
    it('should escape equal ("=") characters', () => {
        expect(escapeRegexpString("=")).toEqual("\\=");
    });
    
    it('should escape caret ("^") characters', () => {
        expect(escapeRegexpString("^")).toEqual("\\^");
    });
    
    it('should escape exclamation mark ("!") characters', () => {
        expect(escapeRegexpString("!")).toEqual("\\!");
    });

    it('should escape colon (":") characters', () => {
        expect(escapeRegexpString(":")).toEqual("\\:");
    });
    
    it('should escape dollar ("$") characters', () => {
        expect(escapeRegexpString("$")).toEqual("\\$");
    });
    
    it('should escape left curly bracket ("{") characters', () => {
        expect(escapeRegexpString("{")).toEqual("\\{");
    });
    
    it('should escape right curly bracket ("}") characters', () => {
        expect(escapeRegexpString("}")).toEqual("\\}");
    });
    
    it('should escape left parenthesis ("(") characters', () => {
        expect(escapeRegexpString("(")).toEqual("\\(");
    });
    
    it('should escape right parenthesis (")") characters', () => {
        expect(escapeRegexpString(")")).toEqual("\\)");
    });
    
    it('should escape left bracket ("[") characters', () => {
        expect(escapeRegexpString("[")).toEqual("\\[");
    });
    
    it('should escape right bracket ("]") characters', () => {
        expect(escapeRegexpString("]")).toEqual("\\]");
    });
    
    it('should escape slash ("/") characters', () => {
        expect(escapeRegexpString("/")).toEqual("\\/");
    });
    
    it('should escape back slash ("\\") characters', () => {
        expect(escapeRegexpString("\\")).toEqual("\\\\");
    });
    
    it('should escape all RegExp special characters', () => {
        expect(escapeRegexpString(HTTP_PARSER.source)).toEqual(HTTP_PARSER_SRC_ESCAPED);
    });
});
