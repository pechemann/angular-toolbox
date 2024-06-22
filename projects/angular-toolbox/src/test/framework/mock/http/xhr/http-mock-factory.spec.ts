import { TestBed } from '@angular/core/testing';
import { HttpMockService } from '../../../../../lib/model/service/mock/http/http-mock.service';
import { httpMockFactory } from '../../../../../lib/framework/mock/http/xhr/http-mock-factory';
import { XhrFactory } from '@angular/common';

describe('httpMockFactory', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpMockService,
        { provide: XhrFactory, useFactory: httpMockFactory }
      ]
    });
  });

  it('should create a new XhrFactory concrete implementation', () => {
    const factory: XhrFactory = TestBed.runInInjectionContext(httpMockFactory);
    expect(factory).toBeInstanceOf(XhrFactory);
  });
});
