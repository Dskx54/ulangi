import { ObservableProgressScreen } from '@ulangi/ulangi-observable';

import { DailyStreakDelegate } from '../../delegates/progress/DailyStreakDelegate';
import { DateRangeDelegate } from "../../delegates/progress/DateRangeDelegate";
import { HeatMapDelegate } from '../../delegates/progress/HeatMapDelegate';
import { ProgressScreenDelegate } from '../../delegates/progress/ProgresScreenDelegate';
import { ScreenFactory } from '../ScreenFactory';

export class ProgressScreenFactory extends ScreenFactory {

  public createDateRangeDelegate(): DateRangeDelegate {
    return new DateRangeDelegate()
  }

  public createScreenDelegate(
    observableScreen: ObservableProgressScreen,
  ): ProgressScreenDelegate {
    const dailyStreakDelegate = new DailyStreakDelegate(
      this.eventBus,
      observableScreen.dailyStreakState,
    );

    const heatMapDelegate = new HeatMapDelegate(
      this.eventBus,
      observableScreen.heatMapState,
    );

    return new ProgressScreenDelegate(
      dailyStreakDelegate,
      heatMapDelegate,
    );
  }
}
