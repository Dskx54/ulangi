import { ActionType, createAction } from '@ulangi/ulangi-action';
import { ActivityState } from '@ulangi/ulangi-common/enums';
import { EventBus, group, on, once } from '@ulangi/ulangi-event';
import { ObservableDailyStreakState } from '@ulangi/ulangi-observable';

export class DailyStreakDelegate {
  private eventBus: EventBus;
  private dailyStreakState: ObservableDailyStreakState;

  public constructor(
    eventBus: EventBus,
    dailyStreakState: ObservableDailyStreakState,
  ) {
    this.eventBus = eventBus;
    this.dailyStreakState = dailyStreakState;
  }

  public getDailyStreak(): void {
    this.eventBus.pubsub(
      createAction(ActionType.STATISTICS__GET_DAILY_STREAK, null),
      group(
        on(
          ActionType.STATISTICS__GETTING_DAILY_STREAK,
          (): void => {
            this.dailyStreakState.fetchState = ActivityState.ACTIVE;
          },
        ),
        once(
          ActionType.STATISTICS__GET_DAILY_STREAK_SUCCEEDED,
          ({ dailyStreak }): void => {
            this.dailyStreakState.dailyStreak = dailyStreak;
            this.dailyStreakState.fetchState = ActivityState.INACTIVE;
          },
        ),
        once(
          ActionType.STATISTICS__GET_DAILY_STREAK_FAILED,
          (): void => {
            this.dailyStreakState.dailyStreak = null;
            this.dailyStreakState.fetchState = ActivityState.ERROR;
          },
        ),
      ),
    );
  }
}
