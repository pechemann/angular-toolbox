/**
 * The VersionConfig interface provides the basic API that defines a version config token.
 */
export interface VersionConfig {

    /**
     * Specifies the major number for this config.
     */
    major: number;
    
    /**
     * Specifies the minor number for this config.
     */
    minor: number;

    /**
     * Specifies the patch number for this config.
     */
    patch: number;

    /**
     * Specifies the timestamp that corresponds to the build date for this config.
     */
    buildTimestamp: number;
}