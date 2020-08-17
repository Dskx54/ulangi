import * as moment from 'moment';

export class DateRangeDelegate {
  public createRangeByNumberOfDays(numOfDays: number): [Date, Date] {
    const endDate = moment().toDate();
    const startDate = moment(endDate)
      .subtract(numOfDays, 'days')
      .toDate();

    return [startDate, endDate];
  }

  public createRangeByYear(year: number): [Date, Date] {
    const startDate = moment([year, 1, 1]).toDate();
    const endDate = moment([year, 12, 31]).toDate();

    return [startDate, endDate];
  }
}
