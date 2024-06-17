import { TestBed } from '@angular/core/testing';
import { VERSION_CONFIG, VersionService } from '../../../lib/service/core/version.service';
import { VersionImpl } from '../../../lib/model/core/impl/version.impl';
import { Version } from '../../../lib/model/core/version';

describe('VersionService', () => {
  let service: VersionService;

  beforeEach(() => {
    const defaultConfigProvider: any = { provide: VERSION_CONFIG, useValue: VERSION_CONFIG };
    TestBed.configureTestingModule({ providers: [defaultConfigProvider] });
    service = TestBed.inject(VersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getVersion() return a Version object', () => {
    const version: Version = service.getVersion();
    expect(version.major).toBeInstanceOf(Number);
    expect(version.minor).toBeInstanceOf(Number);
    expect(version.major).toBeInstanceOf(Number);
    expect(version.buildTimeStamp).toBeInstanceOf(Number);
    expect(version.toString()).toBeInstanceOf(String);
  });

  it('should getBuidTimestamp() return a number', () => {
    expect(service.getBuildTimestamp()).toBeInstanceOf(Number);
  });
  
  it('should getVersion() return the specified Version object implementation', () => {
    expect(service.getVersion()).toBeInstanceOf(VersionImpl);
  });
});
