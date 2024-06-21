/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

/**
 * @private
 * Provides the list of HTTP verbs.
 */
export enum HTTPMethodRef {

    /**
     * @private
     * A reference to the `connect` route associated with the `CONNECT` HTTP verb.
     */
    CONNECT = 'connect',
  
    /**
     * @private
     * A reference to the `delete` route associated with the `DELETE` HTTP verb.
     */
    DELETE = 'delete',
  
    /**
     * @private
     * A reference to the `get` route associated with the `GET` HTTP verb.
     */
    GET = 'get',
  
    /**
     * @private
     * A reference to the `head` route associated with the `HEAD` HTTP verb.
     */
    HEAD = 'head',
  
    /**
     * @private
     * A reference to the `options` route associated with the `OPTIONS` HTTP verb.
     */
    OPTIONS = 'options',
  
    /**
     * @private
     * A reference to the `patch` route associated with the `PATCH` HTTP verb.
     */
    PATCH = 'patch',
  
    /**
     * @private
     * A reference to the `post` route associated with the `POST` HTTP verb.
     */
    POST = 'post',
  
    /**
     * @private
     * A reference to the `put` route associated with the `PUT` HTTP verb.
     */
    PUT = 'put',
  
    /**
     * @private
     * A reference to the `trace` route associated with the `TRACE` HTTP verb.
     */
    TRACE = 'trace'
  }