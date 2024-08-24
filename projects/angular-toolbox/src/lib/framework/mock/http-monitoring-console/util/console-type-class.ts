/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 * The list of CSS class types for rendered objects.
 */
export enum ConsoleTypeClass {

    /**
     * @private
     * The class type for JS vanilla objects.
     */
    OBJECT = "atx-object",
    
    /**
     * @private
     * The class type for JS string primitives.
     */
    STRING = "atx-string",

    /**
     * @private
     * The class type for JS number primitives.
     */
    NUMBER= "atx-number",

    /**
     * @private
     * The class type for JS boolean primitives.
     */
    BOOLEAN= "atx-boolean",
    
    /**
     * @private
     * The class type for JS Arrays.
     */
    ARRAY= "atx-array",

    /**
     * @private
     * The class type for the JS `null` type.
     */
    NULL= "atx-null"
}
