import { HttpMethodMock } from "../../../../model";

/**
 * @private
 */
export interface RouteMockConfig {

    /**
     * @private
     */
    methodConfig: HttpMethodMock;
    
    /**
     * @private
     */
    parameters: any | null;
}