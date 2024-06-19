import { TestBed } from '@angular/core/testing';
import { HttpMockService } from '../../../../lib/service/http/mock/http-mock.service';
import { XhrFactory } from '@angular/common';
import { xhrProxyFactoryFunction } from 'projects/angular-toolbox/src/lib/service/http/mock/xhr-proxy-factory';

describe('XhrProxyFactory', () => {
  let factory: XhrFactory;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpMockService,
        { provide: XhrFactory, useFactory: xhrProxyFactoryFunction }
      ]
    });
    factory = TestBed.runInInjectionContext(xhrProxyFactoryFunction);
  });

  it('build() method() should create and return a new XMLHttpRequest object', () => {
    // Since it is not possible to test XMLHttpRequest as an interface,
    // XMLHttpRequest implementation will be validates through the XMLHttpRequestProxyImpl test
    // which implements the XMLHttpRequest interface.
    expect(factory.build()).toBeTruthy();
  });
});
