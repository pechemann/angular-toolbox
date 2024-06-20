/**
 * Specifies the semantic versioning of an API.
 */
export interface Version {

    /**
     * Specifies versions with incompatible API changes.
     */
    major: number;
    
    /**
     * Specifies versions with functionalities that have  backward compatibility.
     */
    minor: number;

    /**
     * Specifies versions that fixes bugs.
     */
    patch: number;
    
    /**
     * Specifies the timestamp that corresponds to the build date for this Version object.
     */
    buildTimeStamp: number;

    /**
     * Returns a string representation of this Version object.
     * 
     * @returns a string representation of this Version object.
     */
    toString(): string;
};