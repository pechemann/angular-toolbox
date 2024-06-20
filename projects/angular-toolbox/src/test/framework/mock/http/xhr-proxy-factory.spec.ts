import { TestBed } from '@angular/core/testing';
import { HttpMockService } from '../../../../lib/model/service/mock/http/http-mock.service';
import { XhrFactory } from '@angular/common';
import { xhrProxyFactory } from '../../../../lib/framework/mock/http/xhr-proxy-factory';

describe('XhrProxyFactory', () => {
  let factory: XhrFactory;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpMockService,
        { provide: XhrFactory, useFactory: xhrProxyFactory }
      ]
    });
    factory = TestBed.runInInjectionContext(xhrProxyFactory);
  });

  it('build() method() should create and return a new XMLHttpRequest object', () => {
    // Since it is not possible to test XMLHttpRequest as an interface,
    // XMLHttpRequest implementation will be validates through the XMLHttpRequestProxyImpl test
    // which implements the XMLHttpRequest interface.
    expect(factory.build()).toBeTruthy();
  });
});
