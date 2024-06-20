import { Version } from "../../version/version";

/**
 * Specifies the semantic versioning of an API.
 */
export class VersionImpl implements Version {

    /**
     * Specifies versions with incompatible API changes.
     */
    public readonly major: number;

    /**
     * Specifies versions with functionalities that have  backward compatibility.
     */
    public readonly minor: number;

    /**
     * Specifies versions that fixes bugs.
     */
    public readonly patch: number;
    
    /**
     * Specifies the timestamp that corresponds to the build date for this Version instance.
     */
    public readonly buildTimeStamp: number;

  /**
   * @private
   */
    constructor(major: number, minor: number, patch: number, buildTimeStamp: number) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.buildTimeStamp = buildTimeStamp;
    }

    /**
     * Returns a string representation of this Version object in the form "M.m.p", where
     * "M" represents the major number, "m" represents the minor number and "p" represents
     * the patch number of  this VersionImpl instance.
     * 
     * @returns a string representation of this VersionImpl instance.
     */
    public toString(): string {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
};