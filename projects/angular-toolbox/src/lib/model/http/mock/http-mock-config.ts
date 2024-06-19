import { HttpHeaders, HttpRequest } from "@angular/common/http";

/**
 * Defines the config of a HTTP Response mock object.
 */
export interface HttpResponseMockConfig {

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
    status?: number;

    /**
     * Textual description of response status code, defaults to OK.
     *
     * Do not depend on this.
     */
    statusText?: string;

    /**
     * URL of the resource retrieved, or null if not available.
     */
    url: string | null;
}

/**
 * The HttpMethodMockConfig interface provides actions invoked each time the Angular
 * HttpClient instance sends requests to a specific endpoint route.
 */
export interface HttpMethodMockConfig {

    /**
     * This method emulates a successful HTTP call response.
     * 
     * @param request the request associated with a HTTP call.
     * @returns a user-defined HttpResponse mock object depending on the specified request parameter.
     */
    data?: (request: HttpRequest<any>)=> HttpResponseMockConfig
    
    /**
     * This method emulates an unsuccessful HTTP call response.
     * 
     * @param request the request associated with a HTTP call.
     * @returns a user-defined HttpResponse mock object depending on the specified request parameter.
     */
    error?: (request: HttpRequest<any>)=> HttpResponseMockConfig;
}

/**
 * Provides the API for defining mock strategies for a specific endpoint route.
 */
export interface HttpRouteMockConfig {

    /**
     * The path to the endpoint to mock.
     */
    path: string;

    /**
     * The mock configuration of HTTP GET method calls for specified path.
     */
    get?: HttpMethodMockConfig;
    
    /**
     * The mock configuration of HTTP POST method calls for specified path.
     */
    post?: HttpMethodMockConfig;
    
    /**
     * The mock configuration of HTTP PUT method calls for specified path.
     */
    put?: HttpMethodMockConfig;
    
    /**
     * The mock configuration of HTTP DELETE method calls for specified path.
     */
    delete?: HttpMethodMockConfig;
    
    /**
     * The mock configuration of HTTP PATCH method calls for specified path.
     */
    patch?: HttpMethodMockConfig;
    
    /**
     * The mock configuration of HTTP HEAD method calls for specified path.
     */
    head?: HttpMethodMockConfig;
}

/**
 * An interface that let Developer define mock strategies for Angular HTTP calls.
 */
export interface HttpMockConfig {

    /**
     * The configuration of all mock strategies for each specified routes.
     */
    routes: HttpRouteMockConfig[];
}