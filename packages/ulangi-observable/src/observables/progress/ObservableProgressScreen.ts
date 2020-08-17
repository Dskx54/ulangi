import { ScreenName } from '@ulangi/ulangi-common/enums';

import { ObservableScreen } from '../screen/ObservableScreen';
import { ObservableTitleTopBar } from '../top-bar/ObservableTitleTopBar';
import { ObservableDailyStreakState } from './ObservableDailyStreakState';
import { ObservableHeatMapState } from './ObservableHeatMapState';

export class ObservableProgressScreen extends ObservableScreen {
  public readonly dailyStreakState: ObservableDailyStreakState;
  public readonly heatMapState: ObservableHeatMapState;

  public constructor(
    dailyStreakState: ObservableDailyStreakState,
    heatMapState: ObservableHeatMapState,
    componentId: string,
    screenName: ScreenName,
    topBar: ObservableTitleTopBar
  ) {
    super(componentId, screenName, topBar);
    this.dailyStreakState = dailyStreakState;
    this.heatMapState = heatMapState;
  }
}
