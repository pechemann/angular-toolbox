/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpStatusCode } from "@angular/common/http";
import { HttpStatusText } from "./http-status-text.enum";

/**
 * @private
 * A utility class that helps to retreive a status text depending on its status code.
 */
export class HttpStatusTextFinder {

    /**
     * @private
     * Retreives and return a status text depending on its status code.
     * 
     * @param code The status code for which to find the status text.
     * @returns A `HttpStatusText` constant.
     */
    public static getStatusText(code: HttpStatusCode): HttpStatusText {
        if(code === HttpStatusCode.Continue) return HttpStatusText.CONTINUE;
        if(code === HttpStatusCode.SwitchingProtocols) return HttpStatusText.SWITCHING_PROTOCOLS;
        if(code === HttpStatusCode.Processing) return HttpStatusText.PROCESSING;
        if(code === HttpStatusCode.EarlyHints) return HttpStatusText.EARLY_HINTS;
        if(code === HttpStatusCode.Ok) return HttpStatusText.OK;
        if(code === HttpStatusCode.Created) return HttpStatusText.CREATED;
        if(code === HttpStatusCode.Accepted) return HttpStatusText.ACCEPTED;
        if(code === HttpStatusCode.NonAuthoritativeInformation) return HttpStatusText.NON_AUTHORITATIVE_INFORMATION;
        if(code === HttpStatusCode.NoContent) return HttpStatusText.NO_CONTENT;
        if(code === HttpStatusCode.ResetContent) return HttpStatusText.RESET_CONTENT;
        if(code === HttpStatusCode.PartialContent) return HttpStatusText.PARTIAL_CONTENT;
        if(code === HttpStatusCode.MultiStatus) return HttpStatusText.MULTI_STATUS;
        if(code === HttpStatusCode.AlreadyReported) return HttpStatusText.ALREADY_REPORTED;
        if(code === HttpStatusCode.ImUsed) return HttpStatusText.IM_USED;
        if(code === HttpStatusCode.MultipleChoices) return HttpStatusText.MULTIPLE_CHOICES;
        if(code === HttpStatusCode.MovedPermanently) return HttpStatusText.MOVED_PERMANENTLY;
        if(code === HttpStatusCode.Found) return HttpStatusText.FOUND;
        if(code === HttpStatusCode.SeeOther) return HttpStatusText.SEE_OTHER;
        if(code === HttpStatusCode.NotModified) return HttpStatusText.NOT_MODIFIED;
        if(code === HttpStatusCode.TemporaryRedirect) return HttpStatusText.TEMPORARY_REDIRECT;
        if(code === HttpStatusCode.PermanentRedirect) return HttpStatusText.PERMANENT_REDIRECT;
        if(code === HttpStatusCode.BadRequest) return HttpStatusText.BAD_REQUEST;
        if(code === HttpStatusCode.Unauthorized) return HttpStatusText.UNAUTHORIZED;
        if(code === HttpStatusCode.PaymentRequired) return HttpStatusText.PAYMENT_REQUIRED;
        if(code === HttpStatusCode.Forbidden) return HttpStatusText.FORBIDDEN;
        if(code === HttpStatusCode.NotFound) return HttpStatusText.NOT_FOUND;
        if(code === HttpStatusCode.MethodNotAllowed) return HttpStatusText.METHOD_NOT_ALLOWED;
        if(code === HttpStatusCode.NotAcceptable) return HttpStatusText.NOT_ACCEPTABLE;
        if(code === HttpStatusCode.ProxyAuthenticationRequired) return HttpStatusText.PROXY_AUTHENTICATION_REQUIRED;
        if(code === HttpStatusCode.RequestTimeout) return HttpStatusText.REQUEST_TIMEOUT;
        if(code === HttpStatusCode.Conflict) return HttpStatusText.CONFLICT;
        if(code === HttpStatusCode.Gone) return HttpStatusText.GONE;
        if(code === HttpStatusCode.LengthRequired) return HttpStatusText.LENGTH_REQUIRED;
        if(code === HttpStatusCode.PreconditionFailed) return HttpStatusText.PRECONDITION_FAILED;
        if(code === HttpStatusCode.PayloadTooLarge) return HttpStatusText.PAYLOAD_TOO_LARGE;
        if(code === HttpStatusCode.UriTooLong) return HttpStatusText.URI_TOO_LONG;
        if(code === HttpStatusCode.UnsupportedMediaType) return HttpStatusText.UNSUPPORTED_MEDIA_TYPE;
        if(code === HttpStatusCode.RangeNotSatisfiable) return HttpStatusText.RANGE_NOT_SATISFIABLE;
        if(code === HttpStatusCode.ExpectationFailed) return HttpStatusText.EXPECTATION_FAILED;
        if(code === HttpStatusCode.ImATeapot) return HttpStatusText.I_M_A_TEAPOT;
        if(code === HttpStatusCode.MisdirectedRequest) return HttpStatusText.MISDIRECTED_REQUEST;
        if(code === HttpStatusCode.UnprocessableEntity) return HttpStatusText.UNPROCESSABLE_ENTITY;
        if(code === HttpStatusCode.Locked) return HttpStatusText.LOCKED;
        if(code === HttpStatusCode.FailedDependency) return HttpStatusText.FAILED_DEPENDENCY;
        if(code === HttpStatusCode.UpgradeRequired) return HttpStatusText.UPGRADE_REQUIRED;
        if(code === HttpStatusCode.PreconditionRequired) return HttpStatusText.PRECONDITION_REQUIRED;
        if(code === HttpStatusCode.TooManyRequests) return HttpStatusText.TOO_MANY_REQUESTS;
        if(code === HttpStatusCode.RequestHeaderFieldsTooLarge) return HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE;
        if(code === HttpStatusCode.UnavailableForLegalReasons) return HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS;
        if(code === HttpStatusCode.InternalServerError) return HttpStatusText.INTERNAL_SERVER_ERROR;
        if(code === HttpStatusCode.NotImplemented) return HttpStatusText.NOT_IMPLEMENTED;
        if(code === HttpStatusCode.BadGateway) return HttpStatusText.BAD_GATEWAY;
        if(code === HttpStatusCode.ServiceUnavailable) return HttpStatusText.SERVICE_UNAVAILABLE;
        if(code === HttpStatusCode.GatewayTimeout) return HttpStatusText.GATEWAY_TIMEOUT;
        if(code === HttpStatusCode.HttpVersionNotSupported) return HttpStatusText.HTTP_VERSION_NOT_SUPPORTED;
        if(code === HttpStatusCode.VariantAlsoNegotiates) return HttpStatusText.VARIANT_ALSO_NEGOTIATES;
        if(code === HttpStatusCode.InsufficientStorage) return HttpStatusText.INSUFFICIENT_STORAGE;
        if(code === HttpStatusCode.LoopDetected) return HttpStatusText.LOOP_DETECTED;
        if(code === HttpStatusCode.NotExtended) return HttpStatusText.NOT_EXTENDED;
        if(code === HttpStatusCode.NetworkAuthenticationRequired) return HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED;
        return HttpStatusText.INTERNAL_SERVER_ERROR;
    }
}