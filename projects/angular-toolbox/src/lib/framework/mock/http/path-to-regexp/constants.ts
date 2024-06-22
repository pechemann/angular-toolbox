/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { TokenType } from "./token-type";

/**
 * @private
 * The reference to the default delimiter.
 * Value is `"/"`.
 */
export const DEFAULT_DELIMITER: string = "/";

/**
 * @private
 * The reference to the case insensitive flag.
 * Value is `"i"`.
 */
export const I_FLAG: string = "i";

/**
 * @private
 * The reference to the global flag.
 * Value is `"g"`.
 */
export const G_FLAG: string = "g";

/**
 * @private
 * The reference to the `{` `TokenType`.
 */
export const LEFT_CURLY_BRACE: TokenType = "{";

/**
 * @private
 * The reference to the `}` `TokenType`.
 */
export const RIGHT_CURLY_BRACE: TokenType = "}";

/**
 * @private
 * The reference to the `*` `TokenType`.
 */
export const ASTERISK: TokenType = "*";

/**
 * @private
 * The reference to the `+` `TokenType`.
 */
export const PLUS: TokenType = "+";

/**
 * @private
 * The reference to the `?` `TokenType`.
 */
export const QUESTION_MARK: TokenType = "?";

/**
 * @private
 * The reference to the `NAME` `TokenType`.
 */
export const NAME: TokenType = "NAME";

/**
 * @private
 * The reference to the `PATTERN` `TokenType`.
 */
export const PATTERN: TokenType = "PATTERN";

/**
 * @private
 * The reference to the `CHAR` `TokenType`.
 */
export const CHAR: TokenType = "CHAR";

/**
 * @private
 * The reference to the `ESCAPED` `TokenType`.
 */
export const ESCAPED: TokenType = "ESCAPED";

/**
 * @private
 * The reference to the `END` `TokenType`.
 */
export const END: TokenType = "END";

/**
 * @private
 * The reference to the colon (`:`) character.
 */
export const COLON: string = ":";

/**
 * @private
 * The reference to the left parenthesis (`(`) character.
 */
export const LEFT_PARENTHESIS: string = "(";

/**
 * @private
 * The reference to the right parenthesis (`)`) character.
 */
export const RIGHT_PARENTHESIS: string = ")";


/**
 * @private
 * The reference to the escaped back slash (`\\`) character.
 */
export const ESC_BACK_SLASH: string = "\\";
