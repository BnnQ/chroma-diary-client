import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'countdownDateDays'})
export class CountdownDateDaysPipe implements PipeTransform
{
  transform(date: Date): number
  {
    const currentDate = new Date();
    const difference = date.getTime() - currentDate.getTime();
    if (difference <= 0) return 0;

    const MILLISECONDS_IN_A_SECOND = 1000;
    const SECONDS_IN_A_MINUTE = 60;
    const MINUTES_IN_AN_HOUR = 60;
    const HOURS_IN_A_DAY = 24;

    return Math.floor(difference / (MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE * MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY));
  }
}
