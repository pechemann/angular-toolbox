/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpStatusCode } from "@angular/common/http";
import { HttpStatusText, HttpStatusTextFinder } from "projects/angular-toolbox/src/public-api";

describe('HttpStatusTextFinder', () => {
  
  it('HttpStatusCode.Continue should find and return HttpStatusText.CONTINUE', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Continue)).toEqual(HttpStatusText.CONTINUE);
  });
  
  it('HttpStatusCode.SwitchingProtocols should find and return HttpStatusText.SWITCHING_PROTOCOLS', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.SwitchingProtocols)).toEqual(HttpStatusText.SWITCHING_PROTOCOLS);
  });
  
  it('HttpStatusCode.Processing should find and return HttpStatusText.PROCESSING', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Processing)).toEqual(HttpStatusText.PROCESSING);
  });

  it('HttpStatusCode.EarlyHints should find and return HttpStatusText.EARLY_HINTS', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.EarlyHints)).toEqual(HttpStatusText.EARLY_HINTS);
  });

  it('HttpStatusCode.Ok should find and return HttpStatusText.OK', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Ok)).toEqual(HttpStatusText.OK);
  });

  it('HttpStatusCode.Created should find and return HttpStatusText.OK', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Created)).toEqual(HttpStatusText.CREATED);
  });

  it('HttpStatusCode.Accepted should find and return HttpStatusText.ACCEPTED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Accepted)).toEqual(HttpStatusText.ACCEPTED);
  });

  it('HttpStatusCode.NonAuthoritativeInformation should find and return HttpStatusText.NON_AUTHORITATIVE_INFORMATION', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.NonAuthoritativeInformation)).toEqual(HttpStatusText.NON_AUTHORITATIVE_INFORMATION);
  });

  it('HttpStatusCode.NoContent should find and return HttpStatusText.NO_CONTENT', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.NoContent)).toEqual(HttpStatusText.NO_CONTENT);
  });

  it('HttpStatusCode.ResetContent should find and return HttpStatusText.RESET_CONTENT', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.ResetContent)).toEqual(HttpStatusText.RESET_CONTENT);
  });
  
  it('HttpStatusCode.PartialContent should find and return HttpStatusText.PARTIAL_CONTENT', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.PartialContent)).toEqual(HttpStatusText.PARTIAL_CONTENT);
  });

  it('HttpStatusCode.MultiStatus should find and return HttpStatusText.MULTI_STATUS', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.MultiStatus)).toEqual(HttpStatusText.MULTI_STATUS);
  });

  it('HttpStatusCode.AlreadyReported should find and return HttpStatusText.ALREADY_REPORTED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.AlreadyReported)).toEqual(HttpStatusText.ALREADY_REPORTED);
  });

  it('HttpStatusCode.ImUsed should find and return HttpStatusText.IM_USED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.ImUsed)).toEqual(HttpStatusText.IM_USED);
  });
  
  it('HttpStatusCode.MultipleChoices should find and return HttpStatusText.MULTIPLE_CHOICES', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.MultipleChoices)).toEqual(HttpStatusText.MULTIPLE_CHOICES);
  });

  it('HttpStatusCode.MovedPermanently should find and return HttpStatusText.MOVED_PERMANENTLY', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.MovedPermanently)).toEqual(HttpStatusText.MOVED_PERMANENTLY);
  });

  it('HttpStatusCode.Found should find and return HttpStatusText.FOUND', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Found)).toEqual(HttpStatusText.FOUND);
  });

  it('HttpStatusCode.SeeOther should find and return HttpStatusText.SEE_OTHER', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.SeeOther)).toEqual(HttpStatusText.SEE_OTHER);
  });

  it('HttpStatusCode.NotModified should find and return HttpStatusText.NOT_MODIFIED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.NotModified)).toEqual(HttpStatusText.NOT_MODIFIED);
  });

  it('HttpStatusCode.TemporaryRedirect should find and return HttpStatusText.TEMPORARY_REDIRECT', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.TemporaryRedirect)).toEqual(HttpStatusText.TEMPORARY_REDIRECT);
  });

  it('HttpStatusCode.PermanentRedirect should find and return HttpStatusText.PERMANENT_REDIRECT', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.PermanentRedirect)).toEqual(HttpStatusText.PERMANENT_REDIRECT);
  });

  it('HttpStatusCode.BadRequest should find and return HttpStatusText.BAD_REQUEST', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.BadRequest)).toEqual(HttpStatusText.BAD_REQUEST);
  });

  it('HttpStatusCode.Unauthorized should find and return HttpStatusText.UNAUTHORIZED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Unauthorized)).toEqual(HttpStatusText.UNAUTHORIZED);
  });

  it('HttpStatusCode.PaymentRequired should find and return HttpStatusText.PAYMENT_REQUIRED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.PaymentRequired)).toEqual(HttpStatusText.PAYMENT_REQUIRED);
  });

  it('HttpStatusCode.Forbidden should find and return HttpStatusText.FORBIDDEN', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Forbidden)).toEqual(HttpStatusText.FORBIDDEN);
  });

  it('HttpStatusCode.NotFound should find and return HttpStatusText.NOT_FOUND', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.NotFound)).toEqual(HttpStatusText.NOT_FOUND);
  });

  it('HttpStatusCode.MethodNotAllowed should find and return HttpStatusText.METHOD_NOT_ALLOWED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.MethodNotAllowed)).toEqual(HttpStatusText.METHOD_NOT_ALLOWED);
  });

  it('HttpStatusCode.NotAcceptable should find and return HttpStatusText.NOT_ACCEPTABLE', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.NotAcceptable)).toEqual(HttpStatusText.NOT_ACCEPTABLE);
  });

  it('HttpStatusCode.ProxyAuthenticationRequired should find and return HttpStatusText.PROXY_AUTHENTICATION_REQUIRED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.ProxyAuthenticationRequired)).toEqual(HttpStatusText.PROXY_AUTHENTICATION_REQUIRED);
  });

  it('HttpStatusCode.RequestTimeout should find and return HttpStatusText.REQUEST_TIMEOUT', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.RequestTimeout)).toEqual(HttpStatusText.REQUEST_TIMEOUT);
  });

  it('HttpStatusCode.Conflict should find and return HttpStatusText.CONFLICT', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Conflict)).toEqual(HttpStatusText.CONFLICT);
  });

  it('HttpStatusCode.Gone should find and return HttpStatusText.GONE', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Gone)).toEqual(HttpStatusText.GONE);
  });

  it('HttpStatusCode.LengthRequired should find and return HttpStatusText.LENGTH_REQUIRED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.LengthRequired)).toEqual(HttpStatusText.LENGTH_REQUIRED);
  });

  it('HttpStatusCode.PreconditionFailed should find and return HttpStatusText.PRECONDITION_FAILED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.PreconditionFailed)).toEqual(HttpStatusText.PRECONDITION_FAILED);
  });

  it('HttpStatusCode.PayloadTooLarge should find and return HttpStatusText.PAYLOAD_TOO_LARGE', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.PayloadTooLarge)).toEqual(HttpStatusText.PAYLOAD_TOO_LARGE);
  });

  it('HttpStatusCode.UriTooLong should find and return HttpStatusText.URI_TOO_LONG', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.UriTooLong)).toEqual(HttpStatusText.URI_TOO_LONG);
  });

  it('HttpStatusCode.UnsupportedMediaType should find and return HttpStatusText.UNSUPPORTED_MEDIA_TYPE', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.UnsupportedMediaType)).toEqual(HttpStatusText.UNSUPPORTED_MEDIA_TYPE);
  });

  it('HttpStatusCode.RangeNotSatisfiable should find and return HttpStatusText.RANGE_NOT_SATISFIABLE', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.RangeNotSatisfiable)).toEqual(HttpStatusText.RANGE_NOT_SATISFIABLE);
  });

  it('HttpStatusCode.ExpectationFailed should find and return HttpStatusText.EXPECTATION_FAILED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.ExpectationFailed)).toEqual(HttpStatusText.EXPECTATION_FAILED);
  });

  it('HttpStatusCode.ImATeapot should find and return HttpStatusText.I_M_A_TEAPOT', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.ImATeapot)).toEqual(HttpStatusText.I_M_A_TEAPOT);
  });

  it('HttpStatusCode.MisdirectedRequest should find and return HttpStatusText.MISDIRECTED_REQUEST', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.MisdirectedRequest)).toEqual(HttpStatusText.MISDIRECTED_REQUEST);
  });

  it('HttpStatusCode.UnprocessableEntity should find and return HttpStatusText.UNPROCESSABLE_ENTITY', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.UnprocessableEntity)).toEqual(HttpStatusText.UNPROCESSABLE_ENTITY);
  });

  it('HttpStatusCode.Locked should find and return HttpStatusText.LOCKED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.Locked)).toEqual(HttpStatusText.LOCKED);
  });

  it('HttpStatusCode.FailedDependency should find and return HttpStatusText.FAILED_DEPENDENCY', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.FailedDependency)).toEqual(HttpStatusText.FAILED_DEPENDENCY);
  });

  it('HttpStatusCode.UpgradeRequired should find and return HttpStatusText.UPGRADE_REQUIRED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.UpgradeRequired)).toEqual(HttpStatusText.UPGRADE_REQUIRED);
  });

  it('HttpStatusCode.PreconditionRequired should find and return HttpStatusText.PRECONDITION_REQUIRED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.PreconditionRequired)).toEqual(HttpStatusText.PRECONDITION_REQUIRED);
  });

  it('HttpStatusCode.TooManyRequests should find and return HttpStatusText.TOO_MANY_REQUESTS', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.TooManyRequests)).toEqual(HttpStatusText.TOO_MANY_REQUESTS);
  });

  it('HttpStatusCode.RequestHeaderFieldsTooLarge should find and return HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.RequestHeaderFieldsTooLarge)).toEqual(HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE);
  });

  it('HttpStatusCode.UnavailableForLegalReasons should find and return HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.UnavailableForLegalReasons)).toEqual(HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS);
  });

  it('HttpStatusCode.InternalServerError should find and return HttpStatusText.INTERNAL_SERVER_ERROR', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.InternalServerError)).toEqual(HttpStatusText.INTERNAL_SERVER_ERROR);
  });

  it('HttpStatusCode.NotImplemented should find and return HttpStatusText.NOT_IMPLEMENTED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.NotImplemented)).toEqual(HttpStatusText.NOT_IMPLEMENTED);
  });

  it('HttpStatusCode.BadGateway should find and return HttpStatusText.BAD_GATEWAY', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.BadGateway)).toEqual(HttpStatusText.BAD_GATEWAY);
  });

  it('HttpStatusCode.GatewayTimeout should find and return HttpStatusText.SERVICE_UNAVAILABLE', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.ServiceUnavailable)).toEqual(HttpStatusText.SERVICE_UNAVAILABLE);
  });

  it('HttpStatusCode.GatewayTimeout should find and return HttpStatusText.GATEWAY_TIMEOUT', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.GatewayTimeout)).toEqual(HttpStatusText.GATEWAY_TIMEOUT);
  });

  it('HttpStatusCode.HttpVersionNotSupported should find and return HttpStatusText.HTTP_VERSION_NOT_SUPPORTED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.HttpVersionNotSupported)).toEqual(HttpStatusText.HTTP_VERSION_NOT_SUPPORTED);
  });

  it('HttpStatusCode.VariantAlsoNegotiates should find and return HttpStatusText.VARIANT_ALSO_NEGOTIATES', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.VariantAlsoNegotiates)).toEqual(HttpStatusText.VARIANT_ALSO_NEGOTIATES);
  });

  it('HttpStatusCode.InsufficientStorage should find and return HttpStatusText.INSUFFICIENT_STORAGE', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.InsufficientStorage)).toEqual(HttpStatusText.INSUFFICIENT_STORAGE);
  });

  it('HttpStatusCode.LoopDetected should find and return HttpStatusText.LOOP_DETECTED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.LoopDetected)).toEqual(HttpStatusText.LOOP_DETECTED);
  });

  it('HttpStatusCode.NotExtended should find and return HttpStatusText.NOT_EXTENDED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.NotExtended)).toEqual(HttpStatusText.NOT_EXTENDED);
  });

  it('HttpStatusCode.NetworkAuthenticationRequired should find and return HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED', () => {
    expect(HttpStatusTextFinder.getStatusText(HttpStatusCode.NetworkAuthenticationRequired)).toEqual(HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED);
  });
});
