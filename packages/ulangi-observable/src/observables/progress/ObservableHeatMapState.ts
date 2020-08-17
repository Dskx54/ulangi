import { ActivityState } from '@ulangi/ulangi-common/enums';
import { computed,observable } from 'mobx';
import * as moment from 'moment';

export class ObservableHeatMapState {
  @observable
  public range: [Date, Date];

  @observable
  public data: null | (number | null)[];

  @observable
  public fetchState: ActivityState;

  @computed
  public get numberOfDays(): number {
    const [startDate, endDate] = this.range;

    return moment(endDate).diff(moment(startDate), 'days');
  }

  public constructor(
    range: [Date, Date],
    data: null | (number | null)[],
    fetchState: ActivityState
  ) {
    this.range = range;
    this.data = data;
    this.fetchState = fetchState;
  }
}
