import { ActivityState } from '@ulangi/ulangi-common/enums';
import { observable } from 'mobx';

export class ObservableDailyStreakState {
  @observable
  public dailyStreak: number | null;

  @observable
  public fetchState: ActivityState;

  public constructor(dailyStreak: number | null, fetchState: ActivityState) {
    this.dailyStreak = dailyStreak;
    this.fetchState = fetchState;
  }
}
