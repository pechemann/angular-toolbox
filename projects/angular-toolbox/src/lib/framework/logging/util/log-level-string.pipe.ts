/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { PipeTransform, Pipe } from "@angular/core";
import { LogLevel } from "../../../model";
import { EMPTY_STRING } from "../../../util";

/**
 * Allows to transform the specified `LogLevel` value to its corresponding string.
 */
@Pipe({
  name: 'logLevelString',
  standalone: true
})
export class LogLevelStringPipe implements PipeTransform {

  /**
   * Transforms the `LogLevel` input value into its corresponding string and returns
   * the result of the transformation.
   * 
   * @param value The `LogLevel` input value to transform into a string.
   * @returns A string that represents the specified input `LogLevel`.
   */
  public transform(value: LogLevel | number, dieSilently: boolean = true): string {
    if (value === LogLevel.INFO) return "INFO";
    if (value === LogLevel.CONFIG) return "CONFIG";
    if (value === LogLevel.WARNING) return "WARNING";
    if (value === LogLevel.ERROR) return "ERROR";
    if (value === LogLevel.OFF || dieSilently) return EMPTY_STRING;
    throw new Error("Invalid log level parameter in LogLevelStringPipe: current value is " + value + "while a LogLevel member is expected.");
   }
}