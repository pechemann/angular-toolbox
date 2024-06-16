import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform  {

  constructor(private _sanitizer: DomSanitizer) {}

  /**
   * Transforms the HTML input string value into a SafeHtml instance and returns the result of the transformation.
   * 
   * @param value the HTML input value to rransform into a SafeHtml instance.
   * @returns a SafeHtml instance based on the specified input value.
   */
  public transform(value: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}