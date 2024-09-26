/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpStatusText } from "projects/angular-toolbox/src/public-api";

describe('HttpStatusText', () => {
  
  it('HttpStatusText.CONTINUE should be "Continue"', () => {
    expect(HttpStatusText.CONTINUE).toEqual("Continue");
  });

  it('HttpStatusText.SWITCHING_PROTOCOLS should be "Switching Protocols"', () => {
    expect(HttpStatusText.SWITCHING_PROTOCOLS).toEqual("Switching Protocols");
  });
  
  it('HttpStatusText.PROCESSING should be "Processing"', () => {
    expect(HttpStatusText.PROCESSING).toEqual("Processing");
  });

  it('HttpStatusText.EARLY_HINTS should be "Early Hints"', () => {
    expect(HttpStatusText.EARLY_HINTS).toEqual("Early Hints");
  });

  it('HttpStatusText.OK should be "OK"', () => {
    expect(HttpStatusText.OK).toEqual("OK");
  });
  
  it('HttpStatusText.CREATED should be "Created"', () => {
    expect(HttpStatusText.CREATED).toEqual("Created");
  });
  
  it('HttpStatusText.ACCEPTED should be "Accepted"', () => {
    expect(HttpStatusText.ACCEPTED).toEqual("Accepted");
  });
  
  it('HttpStatusText.NON_AUTHORITATIVE_INFORMATION should be "Non-authoritative Information"', () => {
    expect(HttpStatusText.NON_AUTHORITATIVE_INFORMATION).toEqual("Non-authoritative Information");
  });
  
  it('HttpStatusText.NO_CONTENT should be "No Content"', () => {
    expect(HttpStatusText.NO_CONTENT).toEqual("No Content");
  });

  it('HttpStatusText.RESET_CONTENT should be "Reset Content"', () => {
    expect(HttpStatusText.RESET_CONTENT).toEqual("Reset Content");
  });

  it('HttpStatusText.PARTIAL_CONTENT should be "Partial Content"', () => {
    expect(HttpStatusText.PARTIAL_CONTENT).toEqual("Partial Content");
  });

  it('HttpStatusText.MULTI_STATUS should be "Multi-Status"', () => {
    expect(HttpStatusText.MULTI_STATUS).toEqual("Multi-Status");
  });

  it('HttpStatusText.ALREADY_REPORTED should be "Already Reported"', () => {
    expect(HttpStatusText.ALREADY_REPORTED).toEqual("Already Reported");
  });

  it('HttpStatusText.IM_USED should be "IM Used"', () => {
    expect(HttpStatusText.IM_USED).toEqual("IM Used");
  });

  it('HttpStatusText.MULTIPLE_CHOICES should be "Multiple Choices"', () => {
    expect(HttpStatusText.MULTIPLE_CHOICES).toEqual("Multiple Choices");
  });

  it('HttpStatusText.MOVED_PERMANENTLY should be "Moved Permanently"', () => {
    expect(HttpStatusText.MOVED_PERMANENTLY).toEqual("Moved Permanently");
  });

  it('HttpStatusText.FOUND should be "Found"', () => {
    expect(HttpStatusText.FOUND).toEqual("Found");
  });

  it('HttpStatusText.SEE_OTHER should be "See Other"', () => {
    expect(HttpStatusText.SEE_OTHER).toEqual("See Other");
  });

  it('HttpStatusText.NOT_MODIFIED should be "Not Modified"', () => {
    expect(HttpStatusText.NOT_MODIFIED).toEqual("Not Modified");
  });

  it('HttpStatusText.TEMPORARY_REDIRECT should be "Temporary Redirect"', () => {
    expect(HttpStatusText.TEMPORARY_REDIRECT).toEqual("Temporary Redirect");
  });

  it('HttpStatusText.PERMANENT_REDIRECT should be "Permanent Redirect"', () => {
    expect(HttpStatusText.PERMANENT_REDIRECT).toEqual("Permanent Redirect");
  });

  it('HttpStatusText.BAD_REQUEST should be "Bad Request"', () => {
    expect(HttpStatusText.BAD_REQUEST).toEqual("Bad Request");
  });

  it('HttpStatusText.UNAUTHORIZED should be "Unauthorized"', () => {
    expect(HttpStatusText.UNAUTHORIZED).toEqual("Unauthorized");
  });

  it('HttpStatusText.PAYMENT_REQUIRED should be "Payment Required"', () => {
    expect(HttpStatusText.PAYMENT_REQUIRED).toEqual("Payment Required");
  });

  it('HttpStatusText.FORBIDDEN should be "Forbidden"', () => {
    expect(HttpStatusText.FORBIDDEN).toEqual("Forbidden");
  });

  it('HttpStatusText.NOT_FOUND should be "Not Found"', () => {
    expect(HttpStatusText.NOT_FOUND).toEqual("Not Found");
  });

  it('HttpStatusText.METHOD_NOT_ALLOWED should be "Method Not Allowed"', () => {
    expect(HttpStatusText.METHOD_NOT_ALLOWED).toEqual("Method Not Allowed");
  });

  it('HttpStatusText.NOT_ACCEPTABLE should be "Not Acceptable"', () => {
    expect(HttpStatusText.NOT_ACCEPTABLE).toEqual("Not Acceptable");
  });

  it('HttpStatusText.PROXY_AUTHENTICATION_REQUIRED should be "Proxy Authentication Required"', () => {
    expect(HttpStatusText.PROXY_AUTHENTICATION_REQUIRED).toEqual("Proxy Authentication Required");
  });

  it('HttpStatusText.REQUEST_TIMEOUT should be "Request Timeout"', () => {
    expect(HttpStatusText.REQUEST_TIMEOUT).toEqual("Request Timeout");
  });

  it('HttpStatusText.CONFLICT should be "Conflict"', () => {
    expect(HttpStatusText.CONFLICT).toEqual("Conflict");
  });

  it('HttpStatusText.GONE should be "Gone"', () => {
    expect(HttpStatusText.GONE).toEqual("Gone");
  });

  it('HttpStatusText.LENGTH_REQUIRED should be "Gone"', () => {
    expect(HttpStatusText.LENGTH_REQUIRED).toEqual("Length Required");
  });

  it('HttpStatusText.PRECONDITION_FAILED should be "Precondition Failed"', () => {
    expect(HttpStatusText.PRECONDITION_FAILED).toEqual("Precondition Failed");
  });

  it('HttpStatusText.PAYLOAD_TOO_LARGE should be "Payload Too Large"', () => {
    expect(HttpStatusText.PAYLOAD_TOO_LARGE).toEqual("Payload Too Large");
  });

  it('HttpStatusText.URI_TOO_LONG should be "URI Too Long"', () => {
    expect(HttpStatusText.URI_TOO_LONG).toEqual("URI Too Long");
  });

  it('HttpStatusText.UNSUPPORTED_MEDIA_TYPE should be "Unsupported Media Type"', () => {
    expect(HttpStatusText.UNSUPPORTED_MEDIA_TYPE).toEqual("Unsupported Media Type");
  });

  it('HttpStatusText.RANGE_NOT_SATISFIABLE should be "Range Not Satisfiable"', () => {
    expect(HttpStatusText.RANGE_NOT_SATISFIABLE).toEqual("Range Not Satisfiable");
  });

  it('HttpStatusText.EXPECTATION_FAILED should be "Expectation Failed"', () => {
    expect(HttpStatusText.EXPECTATION_FAILED).toEqual("Expectation Failed");
  });

  it('HttpStatusText.I_M_A_TEAPOT should be "I\'m a teapot"', () => {
    expect(HttpStatusText.I_M_A_TEAPOT).toEqual("I'm a teapot");
  });
  
  it('HttpStatusText.MISDIRECTED_REQUEST should be "Misdirected Request"', () => {
    expect(HttpStatusText.MISDIRECTED_REQUEST).toEqual("Misdirected Request");
  });

  it('HttpStatusText.UNPROCESSABLE_ENTITY should be "Unprocessable Entity"', () => {
    expect(HttpStatusText.UNPROCESSABLE_ENTITY).toEqual("Unprocessable Entity");
  });

  it('HttpStatusText.LOCKED should be "Locked"', () => {
    expect(HttpStatusText.LOCKED).toEqual("Locked");
  });

  it('HttpStatusText.FAILED_DEPENDENCY should be "Failed Dependency"', () => {
    expect(HttpStatusText.FAILED_DEPENDENCY).toEqual("Failed Dependency");
  });

  it('HttpStatusText.UPGRADE_REQUIRED should be "Upgrade Required"', () => {
    expect(HttpStatusText.UPGRADE_REQUIRED).toEqual("Upgrade Required");
  });
  
  it('HttpStatusText.PRECONDITION_REQUIRED should be "Precondition Required"', () => {
    expect(HttpStatusText.PRECONDITION_REQUIRED).toEqual("Precondition Required");
  });

  it('HttpStatusText.TOO_MANY_REQUESTS should be "Too Many Requests"', () => {
    expect(HttpStatusText.TOO_MANY_REQUESTS).toEqual("Too Many Requests");
  });

  it('HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE should be "Request Header Fields Too Large"', () => {
    expect(HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE).toEqual("Request Header Fields Too Large");
  });

  it('HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS should be "Unavailable For Legal Reasons"', () => {
    expect(HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS).toEqual("Unavailable For Legal Reasons");
  });

  it('HttpStatusText.INTERNAL_SERVER_ERROR should be "Internal Server Error"', () => {
    expect(HttpStatusText.INTERNAL_SERVER_ERROR).toEqual("Internal Server Error");
  });
  
  it('HttpStatusText.NOT_IMPLEMENTED should be "Not Implemented"', () => {
    expect(HttpStatusText.NOT_IMPLEMENTED).toEqual("Not Implemented");
  });

  it('HttpStatusText.BAD_GATEWAY should be "Bad Gateway"', () => {
    expect(HttpStatusText.BAD_GATEWAY).toEqual("Bad Gateway");
  });
  
  it('HttpStatusText.SERVICE_UNAVAILABLE should be "Service Unavailable"', () => {
    expect(HttpStatusText.SERVICE_UNAVAILABLE).toEqual("Service Unavailable");
  });

  it('HttpStatusText.GATEWAY_TIMEOUT should be "Gateway Timeout"', () => {
    expect(HttpStatusText.GATEWAY_TIMEOUT).toEqual("Gateway Timeout");
  });

  it('HttpStatusText.HTTP_VERSION_NOT_SUPPORTED should be "HTTP Version Not Supported"', () => {
    expect(HttpStatusText.HTTP_VERSION_NOT_SUPPORTED).toEqual("HTTP Version Not Supported");
  });

  it('HttpStatusText.VARIANT_ALSO_NEGOTIATES should be "Variant Also Negotiates"', () => {
    expect(HttpStatusText.VARIANT_ALSO_NEGOTIATES).toEqual("Variant Also Negotiates");
  });

  it('HttpStatusText.INSUFFICIENT_STORAGE should be "Insufficient Storage"', () => {
    expect(HttpStatusText.INSUFFICIENT_STORAGE).toEqual("Insufficient Storage");
  });

  it('HttpStatusText.LOOP_DETECTED should be "Loop Detected"', () => {
    expect(HttpStatusText.LOOP_DETECTED).toEqual("Loop Detected");
  });

  it('HttpStatusText.NOT_EXTENDED should be "Not Extended"', () => {
    expect(HttpStatusText.NOT_EXTENDED).toEqual("Not Extended");
  });

  it('HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED should be "Network Authentication Required"', () => {
    expect(HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED).toEqual("Network Authentication Required");
  });
});
