/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * The list of all HTTP status text.
 */
export enum HttpStatusText {

    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // Informational

    /**
     * The status text associated with the status code `100`.
     */
    CONTINUE = "Continue",

    /**
     * The status text associated with the status code `101`.
     */
    SWITCHING_PROTOCOLS = "Switching Protocols",

    /**
     * The status text associated with the status code `102`.
     */
    PROCESSING = "Processing",
    
    /**
     * The status text associated with the status code `103`.
     */
    EARLY_HINTS = "Early Hints",
    
    // Success

    /**
     * The status text associated with the status code `200`.
     */
    OK = "OK",

    /**
     * The status text associated with the status code `201`.
     */
    CREATED = "Created",

    /**
     * The status text associated with the status code `202`.
     */
    ACCEPTED = "Accepted",

    /**
     * The status text associated with the status code `203`.
     */
    NON_AUTHORITATIVE_INFORMATION = "Non-authoritative Information",

    /**
     * The status text associated with the status code `204`.
     */
    NO_CONTENT = "No Content",

    /**
     * The status text associated with the status code `205`.
     */
    RESET_CONTENT = "Reset Content",

    /**
     * The status text associated with the status code `206`.
     */
    PARTIAL_CONTENT = "Partial Content",

    /**
     * The status text associated with the status code `207`.
     */
    MULTI_STATUS = "Multi-Status",

    /**
     * The status text associated with the status code `208`.
     */
    ALREADY_REPORTED = "Already Reported",

    /**
     * The status text associated with the status code `226`.
     */
    IM_USED = "IM Used",

    // Redirection

    /**
     * The status text associated with the status code `300`.
     */
    MULTIPLE_CHOICES = "Multiple Choices",

    /**
     * The status text associated with the status code `301`.
     */
    MOVED_PERMANENTLY = "Moved Permanently",

    /**
     * The status text associated with the status code `302`.
     */
    FOUND = "Found",

    /**
     * The status text associated with the status code `303`.
     */
    SEE_OTHER = "See Other",

    /**
     * The status text associated with the status code `304`.
     */
    NOT_MODIFIED = "Not Modified",

    /**
     * The status text associated with the status code `307`.
     */
    TEMPORARY_REDIRECT = "Temporary Redirect",

    /**
     * The status text associated with the status code `308`.
     */
    PERMANENT_REDIRECT = "Permanent Redirect",

    // Client Error
    
    /**
     * The status text associated with the status code `400`.
     */
    BAD_REQUEST = "Bad Request",

    /**
     * The status text associated with the status code `401`.
     */
    UNAUTHORIZED = "Unauthorized",

    /**
     * The status text associated with the status code `402`.
     */
    PAYMENT_REQUIRED = "Payment Required",

    /**
     * The status text associated with the status code `403`.
     */
    FORBIDDEN = "Forbidden",

    /**
     * The status text associated with the status code `404`.
     */
    NOT_FOUND = "Not Found",

    /**
     * The status text associated with the status code `405`.
     */
    METHOD_NOT_ALLOWED = "Method Not Allowed",

    /**
     * The status text associated with the status code `406`.
     */
    NOT_ACCEPTABLE = "Not Acceptable",

    /**
     * The status text associated with the status code `407`.
     */
    PROXY_AUTHENTICATION_REQUIRED = "Proxy Authentication Required",

    /**
     * The status text associated with the status code `408`.
     */
    REQUEST_TIMEOUT = "Request Timeout",

    /**
     * The status text associated with the status code `409`.
     */
    CONFLICT = "Conflict",

    /**
     * The status text associated with the status code `410`.
     */
    GONE = "Gone",

    /**
     * The status text associated with the status code `411`.
     */
    LENGTH_REQUIRED = "Length Required",

    /**
     * The status text associated with the status code `412`.
     */
    PRECONDITION_FAILED = "Precondition Failed",

    /**
     * The status text associated with the status code `413`.
     */
    PAYLOAD_TOO_LARGE = "Payload Too Large",

    /**
     * The status text associated with the status code `414`.
     */
    URI_TOO_LONG = "URI Too Long",

    /**
     * The status text associated with the status code `415`.
     */
    UNSUPPORTED_MEDIA_TYPE = "Unsupported Media Type",

    /**
     * The status text associated with the status code `416`.
     */
    RANGE_NOT_SATISFIABLE = "Range Not Satisfiable",

    /**
     * The status text associated with the status code `417`.
     */
    EXPECTATION_FAILED = "Expectation Failed",

    /**
     * The status text associated with the status code `418`.
     */
    I_M_A_TEAPOT = "I'm a teapot",

    /**
     * The status text associated with the status code `421`.
     */
    MISDIRECTED_REQUEST = "Misdirected Request",

    /**
     * The status text associated with the status code `422`.
     */
    UNPROCESSABLE_ENTITY = "Unprocessable Entity",

    /**
     * The status text associated with the status code `423`.
     */
    LOCKED = "Locked",

    /**
     * The status text associated with the status code `424`.
     */
    FAILED_DEPENDENCY = "Failed Dependency",

    /**
     * The status text associated with the status code `426`.
     */
    UPGRADE_REQUIRED = "Upgrade Required",

    /**
     * The status text associated with the status code `428`.
     */
    PRECONDITION_REQUIRED = "Precondition Required",

    /**
     * The status text associated with the status code `429`.
     */
    TOO_MANY_REQUESTS = "Too Many Requests",

    /**
     * The status text associated with the status code `431`.
     */
    REQUEST_HEADER_FIELDS_TOO_LARGE = "Request Header Fields Too Large",

    /**
     * The status text associated with the status code `451`.
     */
    UNAVAILABLE_FOR_LEGAL_REASONS = "Unavailable For Legal Reasons",

    //Server Error

    /**
     * The status text associated with the status code `500`.
     */
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    
    /**
     * The status text associated with the status code `501`.
     */
    NOT_IMPLEMENTED = "Not Implemented",
    
    /**
     * The status text associated with the status code `502`.
     */
    BAD_GATEWAY = "Bad Gateway",
    
    /**
     * The status text associated with the status code `503`.
     */
    SERVICE_UNAVAILABLE = "Service Unavailable",
    
    /**
     * The status text associated with the status code `504`.
     */
    GATEWAY_TIMEOUT = "Gateway Timeout",
    
    /**
     * The status text associated with the status code `505`.
     */
    HTTP_VERSION_NOT_SUPPORTED = "HTTP Version Not Supported",
    
    /**
     * The status text associated with the status code `506`.
     */
    VARIANT_ALSO_NEGOTIATES = "Variant Also Negotiates",
    
    /**
     * The status text associated with the status code `507`.
     */
    INSUFFICIENT_STORAGE = "Insufficient Storage",
    
    /**
     * The status text associated with the status code `508`.
     */
    LOOP_DETECTED = "Loop Detected",
    
    /**
     * The status text associated with the status code `510`.
     */
    NOT_EXTENDED = "Not Extended",
    
    /**
     * The status text associated with the status code `511`.
     */
    NETWORK_AUTHENTICATION_REQUIRED = "Network Authentication Required",
}