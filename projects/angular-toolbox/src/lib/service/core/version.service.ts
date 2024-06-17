import { Inject, Injectable } from '@angular/core';
import { Version, VersionImpl } from '../../model';
import { VersionConfig } from '../../model/core/version-config';

/**
 * The default provider for the VersionService configuration. You typically define
 * the custom properties in the main NgModule declaration to initialize the app / library config:
 * 
 * @NgModule({
 * ...
 * providers: [
 *   { provide: VERSION_CONFIG, useValue: { major: 1, minor: 2, patch: 12 } }
 * ],
 * ...
 * });
 */
export const VERSION_CONFIG: VersionConfig = {
  
  /**
   * Specifies the major number of this config.
   */
  major: 0,

  /**
   * Specifies the minor number of this config.
   */
  minor: 0,

  /**
   * Specifies the patch number of this config.
   */
  patch: 0,

    /**
     * Specifies the timestamp that corresponds to the build date for this Version object.
     * Default value is NaN.
     */
  buildTimeStamp: NaN
};

/**
 * A lightweight service that provides Semantic Versioning implementation for your Angular projects.
 */
@Injectable({
  providedIn: 'root'
})
export class VersionService {

    // --> Private properties
  private readonly _version: Version;

    /**
     * Creates a new VersionService instance.
     * @param config the reference to the VersionConfig provider.
     */
  constructor(@Inject(VERSION_CONFIG) config: VersionConfig) {
    this._version = new VersionImpl(
      config.major,
      config.minor,
      config.patch,
      config.buildTimeStamp
    );
  }

  /**
   * Returns the version of the associated Angular project.
   * 
   * @return the version of the associated Angular project.
   */
  public getVersion(): Version {
    return this._version;
  }
  
  /**
   * Returns the build timestamp of the associated Angular project.
   * 
   * @return the  build timestamp of the associated Angular project.
   */
  public getBuidTimestamp(): number {
    return this._version.buildTimeStamp;
  }
}
