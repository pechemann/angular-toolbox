import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser'
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  const HTML: string = '<h1>My HTML String</h1>';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new SafeHtmlPipe(TestBed.inject(DomSanitizer));
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
  
  it('transform() should return the correct HTML string', () => {
    const resultString = (pipe.transform(HTML) as any).changingThisBreaksApplicationSecurity;
    expect(resultString).toBe(HTML);
  });
});
