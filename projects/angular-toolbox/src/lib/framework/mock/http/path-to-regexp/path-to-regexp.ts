/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 *
 * This source code is derived from the following original source code:
 * - https://github.com/pillarjs/path-to-regexp
 * - Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)
 * 
 * Use of the original source code is governed by an MIT-style license 
 * that can be found in the LICENSE file at
 * https://github.com/pillarjs/path-to-regexp/blob/master/LICENSE
 */

import { EMPTY_STRING } from "../../../../util";

const DEFAULT_DELIMITER: string = "/";
const NOOP_VALUE: (value: string)=> string = (value: string): string => value;
const ID_CHAR: RegExp = /^\p{XID_Continue}$/u;

type TokenType =
  | "{"
  | "}"
  | "*"
  | "+"
  | "?"
  | "NAME"
  | "PATTERN"
  | "CHAR"
  | "ESCAPED"
  | "END"
  // Reserved for use.
  | "!"
  | "@"
  | ";";

const SIMPLE_TOKENS: Record<string, TokenType> = {
  "!": "!",
  "@": "@",
  ";": ";",
  "*": "*",
  "+": "+",
  "?": "?",
  "{": "{",
  "}": "}",
};

/**
 * A key is a capture group in the regex.
 */
export interface Key {
  name: string;
  prefix: string;
  suffix: string;
  pattern: string;
  modifier: string;
  separator?: string;
}

/**
 * A token is a string (nothing special) or key metadata (capture group).
 */
type Token = string | Key;


/**
 * Tokenized path instance. Can we passed around instead of string.
 */
export class TokenData {
  constructor(
    public readonly tokens: Token[],
    public readonly delimiter: string,
  ) {}
}

/**
 * Encode a string into another string.
 */
type Encode = (value: string) => string;

export interface ParseOptions {
  /**
   * Set the default delimiter for repeat parameters. (default: `'/'`)
   */
  delimiter?: string;
  /**
   * List of characters to automatically consider prefixes when parsing.
   */
  prefixes?: string;
  /**
   * Function for encoding input strings for output into path.
   */
  encodePath?: Encode;
}

export interface PathToRegexpOptions extends ParseOptions {
  /**
   * When `true` the regexp will be case sensitive. (default: `false`)
   */
  sensitive?: boolean;
  /**
   * Set characters to treat as "loose" and allow arbitrarily repeated. (default: `/`)
   */
  loose?: string;
  /**
   * When `true` the regexp will match to the end of the string. (default: `true`)
   */
  end?: boolean;
  /**
   * When `true` the regexp will match from the beginning of the string. (default: `true`)
   */
  start?: boolean;
  /**
   * When `true` the regexp allows an optional trailing delimiter to match. (default: `true`)
   */
  trailing?: boolean;
}

/**
 * Tokenizer results.
 */
interface LexToken {
  type: TokenType;
  index: number;
  value: string;
}

const toKey: Function = (
  encode: Encode,
  delimiter: string,
  name: string,
  pattern = "",
  inputPrefix = "",
  inputSuffix = "",
  modifier = "",
): Key => {
  const prefix: string= encode(inputPrefix);
  const suffix: string = encode(inputSuffix);
  const separator: string | undefined =
    modifier === "*" || modifier === "+"
      ? prefix + suffix || delimiter
      : undefined;
  return { name, prefix, suffix, pattern, modifier, separator };
}

/**
 * Escape a regular expression string.
 */
const escape: Encode = (str: string)=> {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}

/**
 * Get the flags for a regexp from the options.
 */
const flags: Function = (options: { sensitive?: boolean }): string=> {
  return options.sensitive ? EMPTY_STRING : "i";
}

/**
 * Tokenize input string.
 */
const lexer: (str: string)=> Iter = (str: string): Iter=> {
  const chars: string[] = [...str];
  const tokens: LexToken[] = [];
  let i: number = 0;

  while (i < chars.length) {
    const value: string = chars[i];
    const type = SIMPLE_TOKENS[value];

    if (type) {
      tokens.push({ type, index: i++, value });
      continue;
    }

    if (value === "\\") {
      tokens.push({ type: "ESCAPED", index: i++, value: chars[i++] });
      continue;
    }

    if (value === ":") {
      let name: string = EMPTY_STRING;

      while (ID_CHAR.test(chars[++i])) {
        name += chars[i];
      }

      if (!name) {
        throw new TypeError(`Missing parameter name at ${i}`);
      }

      tokens.push({ type: "NAME", index: i, value: name });
      continue;
    }

    if (value === "(") {
      const pos: number = i++;
      let count: number = 1;
      let pattern: string = EMPTY_STRING;

      if (chars[i] === "?") {
        throw new TypeError(`Pattern cannot start with "?" at ${i}`);
      }

      while (i < chars.length) {
        if (chars[i] === "\\") {
          pattern += chars[i++] + chars[i++];
          continue;
        }

        if (chars[i] === ")") {
          count--;
          if (count === 0) {
            i++;
            break;
          }
        } else if (chars[i] === "(") {
          count++;
          if (chars[i + 1] !== "?") {
            throw new TypeError(`Capturing groups are not allowed at ${i}`);
          }
        }

        pattern += chars[i++];
      }

      if (count) throw new TypeError(`Unbalanced pattern at ${pos}`);
      if (!pattern) throw new TypeError(`Missing pattern at ${pos}`);

      tokens.push({ type: "PATTERN", index: i, value: pattern });
      continue;
    }

    tokens.push({ type: "CHAR", index: i, value: chars[i++] });
  }

  tokens.push({ type: "END", index: i, value: EMPTY_STRING });

  return new Iter(tokens);
}

class Iter {

  private _index: number = 0;

  constructor(private tokens: LexToken[]) {}

  public tryConsume(type: LexToken["type"]): string | undefined {
    const token: LexToken = this.peek();
    if (token.type !== type) return;
    this._index++;
    return token.value;
  }

  public consume(type: LexToken["type"]): string {
    const value: string | undefined = this.tryConsume(type);
    if (value !== undefined) return value;
    const { type: nextType, index } = this.peek();
    throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}`);
  }

  public text(): string {
    let result = EMPTY_STRING;
    let value: string | undefined;
    while ((value = this.tryConsume("CHAR") || this.tryConsume("ESCAPED"))) {
      result += value;
    }
    return result;
  }

  public modifier(): string | undefined {
    return this.tryConsume("?") || this.tryConsume("*") || this.tryConsume("+");
  }

  private peek(): LexToken {
    return this.tokens[this._index];
  }
}

/**
 * Convert a token into a regexp string (re-used for path validation).
 */
const toKeyRegexp: Function = (stringify: Encode, delimiter: string): any => {
  const segmentPattern: string = `[^${escape(delimiter)}]+?`;

  return (key: Key) => {
    const prefix: string = stringify(key.prefix);
    const suffix: string = stringify(key.suffix);

    if (key.name) {
      const pattern: string = key.pattern || segmentPattern;
      if (key.separator) {
        const mod: string = key.modifier === "*" ? "?" : EMPTY_STRING;
        const split: string = stringify(key.separator);
        return `(?:${prefix}((?:${pattern})(?:${split}(?:${pattern}))*)${suffix})${mod}`;
      } else {
        return `(?:${prefix}(${pattern})${suffix})${key.modifier}`;
      }
    }

    return `(?:${prefix}${suffix})${key.modifier}`;
  };
}

/**
 * Escape and repeat loose characters for regular expressions.
 */
const looseReplacer: (substring: string, ...args: any[])=> string = (value: string, loose: string): string => {
  return loose ? `${escape(value)}+` : escape(value);
}

/**
 * Encode all non-delimiter characters using the encode function.
 */
const toStringify: Function = (loose: string): Function => {
  if (!loose) return escape;

  const re: RegExp = new RegExp(`[^${escape(loose)}]+|(.)`, "g");
  return (value: string) => value.replace(re, looseReplacer);
}

/**
 * Parse a string for the raw tokens.
 */
export const stringToTokenData: Function = (str: string, options: ParseOptions = {}): TokenData => {
  const {
    prefixes = "./",
    delimiter = DEFAULT_DELIMITER,
    encodePath = NOOP_VALUE,
  } = options;
  const tokens: Token[] = [];
  const it: Iter = lexer(str);
  let keyIndex: number = 0;
  let path: string = EMPTY_STRING;

  do {
    const char: string | undefined = it.tryConsume("CHAR");
    const name: string | undefined = it.tryConsume("NAME");
    const pattern: string | undefined = it.tryConsume("PATTERN");

    if (name || pattern) {
      let prefix: string = char || EMPTY_STRING;
      const modifier: string | undefined = it.modifier();

      if (!prefixes.includes(prefix)) {
        path += prefix;
        prefix = EMPTY_STRING;
      }

      if (path) {
        tokens.push(encodePath(path));
        path = EMPTY_STRING;
      }

      tokens.push(
        toKey(
          encodePath,
          delimiter,
          name || String(keyIndex++),
          pattern,
          prefix,
          EMPTY_STRING,
          modifier,
        ),
      );
      continue;
    }

    const value: string | undefined = char || it.tryConsume("ESCAPED");
    if (value) {
      path += value;
      continue;
    }

    if (path) {
      tokens.push(encodePath(path));
      path = EMPTY_STRING;
    }

    const asterisk: string | undefined = it.tryConsume("*");
    if (asterisk) {
      tokens.push(
        toKey(
          encodePath,
          delimiter,
          String(keyIndex++),
          `[^${escape(delimiter)}]*`,
          EMPTY_STRING,
          EMPTY_STRING,
          asterisk,
        ),
      );
      continue;
    }

    const open: string | undefined = it.tryConsume("{");
    if (open) {
      const prefix: string = it.text();
      const name: string | undefined = it.tryConsume("NAME");
      const pattern: string | undefined = it.tryConsume("PATTERN");
      const suffix: string = it.text();

      it.consume("}");

      tokens.push(
        toKey(
          encodePath,
          delimiter,
          name || (pattern ? String(keyIndex++) : EMPTY_STRING),
          pattern,
          prefix,
          suffix,
          it.modifier(),
        ),
      );
      continue;
    }

    it.consume("END");
    break;
  } while (true);

  return new TokenData(tokens, delimiter);
}

/**
 * @Private
 * Expose a function for taking tokens and returning a RegExp.
 */
export const tokenDataToRegexp: Function = (data: TokenData, keys: Key[], options: PathToRegexpOptions): RegExp => {
  const {
    trailing = true,
    start = true,
    end = true,
    loose = DEFAULT_DELIMITER,
  } = options;
  const stringify: Function = toStringify(loose);
  const keyToRegexp: Function = toKeyRegexp(stringify, data.delimiter);
  let pattern: string = start ? "^" : EMPTY_STRING;

  for (const token of data.tokens) {
    if (typeof token === "string") {
      pattern += stringify(token);
    } else {
      if (token.name) keys.push(token);
      pattern += keyToRegexp(token);
    }
  }

  if (trailing) pattern += `(?:${stringify(data.delimiter)})?`;
  pattern += end ? "$" : `(?=${escape(data.delimiter)}|$)`;

  return new RegExp(pattern, flags(options));
}

