/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 * The list of object types used to qualify parsed objects.
 */
export enum ConsoleBodyType {

    /**
     * @private
     * Indicates that the type of object is not supported.
     */
    INVALID = -1,
    
    /**
     * @private
     * Indicates that the object is null.
     */
    NULL = 0,

    /**
     * @private
     * Indicates that the object is a Json.
     */
    JSON = 1,

    /**
     * @private
     * Indicates that the object is a string.
     */
    TEXT = 2,

    /**
     * @private
     * Indicates that the object is a Blob instance.
     */
    BLOB = 3,

    /**
     * @private
     * Indicates that the object is a FormData instance.
     */
    FORM_DATA = 4,

    /**
     * @private
     * Indicates that the object is an ArrayBuffer instance.
     */
    ARRAY_BUFFER = 5,

    /**
     * @private
     * Indicates that the object is an Array.
     */
    ARRAY = 6
}
