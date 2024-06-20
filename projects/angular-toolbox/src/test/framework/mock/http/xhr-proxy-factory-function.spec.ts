import { TestBed } from '@angular/core/testing';
import { HttpMockService } from '../../../../lib/model/service/mock/http/http-mock.service';
import { xhrProxyFactory } from '../../../../lib/framework/mock/http/xhr-proxy-factory';
import { XhrFactory } from '@angular/common';

describe('xhrProxyFactoryFunction', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpMockService,
        { provide: XhrFactory, useFactory: xhrProxyFactory }
      ]
    });
  });

  it('should create a new XhrFactory concrete implementation', () => {
    const factory: XhrFactory = TestBed.runInInjectionContext(xhrProxyFactory);
    expect(factory).toBeInstanceOf(XhrFactory);
  });
});
