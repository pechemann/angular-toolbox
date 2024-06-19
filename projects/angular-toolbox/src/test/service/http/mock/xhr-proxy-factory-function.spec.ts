import { TestBed } from '@angular/core/testing';
import { HttpMockService } from '../../../../lib/service/http/mock/http-mock.service';
import { xhrProxyFactoryFunction } from '../../../../lib/service/http/mock/xhr-proxy-factory';
import { XhrFactory } from '@angular/common';

describe('xhrProxyFactoryFunction', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpMockService,
        { provide: XhrFactory, useFactory: xhrProxyFactoryFunction }
      ]
    });
  });

  it('should create a new XhrFactory concrete implementation', () => {
    const factory: XhrFactory = TestBed.runInInjectionContext(xhrProxyFactoryFunction);
    expect(factory).toBeInstanceOf(XhrFactory);
  });
});
