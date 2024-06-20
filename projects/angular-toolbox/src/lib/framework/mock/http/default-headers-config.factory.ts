import { HttpHeaders } from "@angular/common/http";

/**
 * @private
 * A static factory that create default configuration for HTTP headers mocks.
 */
export class DefaultHeadersConfigFactory {

    public static create(): HttpHeaders {
        const headers: HttpHeaders = new HttpHeaders();
        headers.set("Accept", "*/*");
        headers.set("Accept-Encoding", "gzip, deflate, br, zstd");
        headers.set("Accept-Language", navigator.language);
        headers.set("Cache-Control", "no-cache");
        headers.set("Pragma", "no-cache");
        headers.set("Priority", "u=0, i");
        headers.set("Sec-Fetch-Dest", "empty");
        headers.set("Sec-Fetch-Mode", "cors");
        headers.set("Sec-Fetch-Site", "cross-site");
        headers.set("User-Agent", navigator.userAgent);
        return headers;
    }
}