import { ScreenName } from '@ulangi/ulangi-common/enums';

import { ObservableScreen } from '../screen/ObservableScreen';
import { ObservableTitleTopBar } from '../top-bar/ObservableTitleTopBar';
import { ObservableHeatMapState } from './ObservableHeatMapState';
import { ObservableStatisticsState } from './ObservableStatisticsState';

export class ObservableProgressScreen extends ObservableScreen {
  public readonly statisticsState: ObservableStatisticsState;
  public readonly heatMapState: ObservableHeatMapState;

  public constructor(
    statisticsState: ObservableStatisticsState,
    heatMapState: ObservableHeatMapState,
    componentId: string,
    screenName: ScreenName,
    topBar: ObservableTitleTopBar
  ) {
    super(componentId, screenName, topBar);
    this.statisticsState = statisticsState;
    this.heatMapState = heatMapState;
  }
}
