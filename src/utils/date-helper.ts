export class DateHelper
{
  public static getCurrentDate() : Date
  {
    return new Date();
  }

  public static getCurrentDatePlusDays(days : number) : Date
  {
    const currentDate = this.getCurrentDate();
    return new Date(currentDate.setDate(currentDate.getDate() + days));
  }
}
