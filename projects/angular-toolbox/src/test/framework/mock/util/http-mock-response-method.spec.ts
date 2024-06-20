import { TestBed } from '@angular/core/testing';
import { HttpResponseMockBuilder, httpResponseMock } from '../../../../public-api';

describe('httpResponseMock', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });
  
  it('httpResponseMock should return an instance of HttpResponseMockBuilder', () => {
    expect(httpResponseMock()).toBeInstanceOf(HttpResponseMockBuilder);
  });
  
  it('httpResponseMock should return a different instance of HttpResponseMockBuilder each time', () => {
    const builder: HttpResponseMockBuilder = httpResponseMock();
    expect(httpResponseMock()).not.toBe(builder);
    expect(httpResponseMock()).not.toBe(builder);
    expect(httpResponseMock()).not.toBe(builder);
  });
});
