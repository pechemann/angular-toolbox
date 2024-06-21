import { HttpHeaders, HttpRequest } from "@angular/common/http";

/**
 * Defines the config of a HTTP Response mock object.
 */
export interface HttpResponseMock {

     /**
     * The response body.
     */
    body?: any;

    /**
     * All response headers.
     */
    headers?: HttpHeaders;

    /**
     * Response status code.
     */
    status: number;

    /**
     * Textual description of response status code, defaults to OK.
     *
     * Do not depend on this.
     */
    statusText: string;

    /**
     * URL of the resource retrieved, or null if not available.
     */
    url: string | null;
}

/**
 * The HttpMethodMock interface provides actions invoked each time the Angular
 * HttpClient instance sends requests to a specific endpoint route.
 */
export interface HttpMethodMock {

    /***
     * Indicates whether to emulate progressive download (true), or not (false) 
     */
    progressive?: boolean;

    /**
     * This method emulates a successful HTTP call response.
     * 
     * @param request the request associated with a HTTP call.
     * @returns a user-defined HttpResponse mock object depending on the specified request parameter.
     */
    data?: (request: HttpRequest<any>, parameters?: any)=> HttpResponseMock;
}

/**
 * Provides the API for defining mock strategies for a specific endpoint.
 */
export interface HttpMockEndpoint {
    
    /**
     * The route pert of the endpoint to mock.
     */
    route: string;

    /**
     * The mock configuration of HTTP GET method calls for specified route.
     */
    get?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP POST method calls for specified route.
     */
    post?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP PUT method calls for specified route.
     */
    put?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP DELETE method calls for specified route.
     */
    delete?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP PATCH method calls for specified route.
     */
    patch?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP HEAD method calls for specified route.
     */
    head?: HttpMethodMock;
}


/**
 * Provides the API for defining mock strategies for a specific API.
 */
export interface HttpMockInterceptor {

    /**
     * The ID of this interceptor.
     */
    id: string;
    
    /**
     * The URL origin for this interceptor, as defined by the URL stanfard.
     * @see https://url.spec.whatwg.org/#url
     */
    origin?: string;

    /**
     * A list of endpoints that must be intercepted by the HTTP Mock Framework.
     */
    endpoints: HttpMockEndpoint[];
}

/**
 * An interface that let Developer define mock strategies for Angular HTTP calls.
 */
export interface HttpMockConfig {

    /**
     * The main URL origin for this mock, as defined by the URL stanfard.
     * @see https://url.spec.whatwg.org/#url
     */
    origin?: string;

    /**
     * The configuration of all mock strategies for each specified API.
     */
    interceptors: HttpMockInterceptor[];
}
