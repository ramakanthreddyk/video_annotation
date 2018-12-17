import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'minuteSeconds'
  })
  export class MinuteSecondsPipe implements PipeTransform {
      transform(value: number): string {
         const minutes: number = Math.floor(value / 60);
         return minutes + ':' + Math.round(value - minutes * 60);
      }
  }