import { Pipe, PipeTransform } from '@angular/core';
/*
 * Converts string with format {h}:{m} to specified format
 * The value must be a string with {h}:{m} format or else this will not be formatted and will return the same value.
 * Usage:
 *   value | hoursMinutesFormatter:format
 * Example:
 *   {{ 24:10 |  exponentialStrength:'{h}h {m}m'}}
 *   formats to: 24h 10m
 */
@Pipe({name: 'hoursMinutesFormatter'})
export class HoursMinutesFormatterPipe implements PipeTransform {
  transform(value: string, format: string): string {
    let formattedValue: string = value;
    let splittedValue: string[] = value.split(':');
    if (value && typeof value == 'string' &&
      format && typeof format == 'string' &&
      splittedValue.length > 0 &&
      splittedValue.length <= 2) {


      let parsedHour: number = parseInt(splittedValue[0]);
      let parsedMin: number = parseInt(splittedValue[1]);

      if (!isNaN(parsedHour) && !isNaN(parsedMin)) {
        formattedValue = format.replace('{h}', parsedHour.toString()).replace('{m}', parsedMin.toString());
      }
    }
    return formattedValue;
  }
}
