import { Inject, Injectable } from '@angular/core';
import { VERSION_CONFIG, Version, VersionConfig, VersionImpl } from '../../../business';

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
      config.buildTimestamp
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
  public getBuildTimestamp(): number {
    return this._version.buildTimeStamp;
  }
}
