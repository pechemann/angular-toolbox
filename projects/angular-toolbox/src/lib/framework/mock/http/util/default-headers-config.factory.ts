import { HttpHeaders } from "@angular/common/http";
import { httpHeadersMock } from "./http-response-headers-mock.builder";

/**
 * @private
 * A static factory that create default configuration for HTTP headers mocks.
 */
export class DefaultHeadersConfigFactory {

    public static createRequestHeaders(): HttpHeaders {
        // "Accept" header is set by Angular framework when missing
        return httpHeadersMock().cacheControl()
                                .acceptEncoding()
                                .set("Accept-Language", navigator.language)
                                .set("Priority", "u=0, i")
                                .set("User-Agent", navigator.userAgent)
                                .headers();
    }
}